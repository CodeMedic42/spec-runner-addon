import reduce from 'lodash/reduce';
import isNil from 'lodash/isNil';
import noop from 'lodash/noop';
import map from 'lodash/map';
import get from 'lodash/get';
import Mocha from './mocha';

// const { Mocha } = global;

// function deleteFromGlobal(key) {
//   delete global[key];
//   delete window[key];
// }

// // Clean up the global space. Mocha is so messy.
// deleteFromGlobal('Mocha');
// deleteFromGlobal('mocha');
// deleteFromGlobal('describe');
// deleteFromGlobal('xdescribe');
// deleteFromGlobal('it');
// deleteFromGlobal('xit');
// deleteFromGlobal('before');
// deleteFromGlobal('after');
// deleteFromGlobal('beforeEach');
// deleteFromGlobal('afterEach');
// deleteFromGlobal('run');

function createMochaInstance(name, spec) {
  const mochaInstance = new Mocha();

  mochaInstance.suite.title = name;

  Mocha.interfaces.bdd(mochaInstance.suite);

  const mochaContext = {};

  mochaInstance.suite.emit('pre-require', mochaContext, null, mochaInstance);

  spec(mochaContext);

  return mochaInstance;
}

function getRootSuite(artifact) {
  let current = artifact;

  if (isNil(current)) {
    return null;
  }

  while (!isNil(current.parent)) {
    current = current.parent;
  }

  return current;
}

function processTest(test, updateParentStatus) {
  const testState = !isNil(test.state) ? test.state : 'pending';

  updateParentStatus(testState);

  return {
    type: 'test',
    status: testState,
    title: test.title,
    message: get(test, ['err', 'message'], null)
  };
}

function processSuite(suite, updateParentStatus) {
  const status = {
    pending: 0,
    running: 0,
    passed: 0,
    failed: 0
  };

  const updateStatus = statusId => {
    status[statusId] += 1;

    if (!isNil(updateParentStatus)) {
      updateParentStatus(statusId);
    }
  };

  return {
    type: 'suite',
    status,
    title: suite.title,
    suites: map(suite.suites, childSuite =>
      processSuite(childSuite, updateStatus)
    ),
    tests: map(suite.tests, childTest => processTest(childTest, updateStatus))
  };
}

function processEvent(artifact) {
  const rootSuite = getRootSuite(artifact);

  const state = !isNil(rootSuite)
    ? processSuite(rootSuite)
    : null;

  this.state = state;

  this.handler(state);
}

export default class TestContext {
  constructor(id, name, spec) {
    this.id = id;
    this.name = name;
    this.handler = noop;
    this.state = {};

    this.instance = createMochaInstance(name, spec);

    processEvent.bind(this)(this.instance.suite);
  }

  disconnect() {
    this.handler = noop;
  }

  connect(handler) {
    this.handler = handler;

    handler(this.state);
  }

  run() {
    const process = processEvent.bind(this);

    process(this.instance.suite);

    reduce(
      Mocha.Runner.constants,
      (acc, eventId) => {
        let eventHandler = process;

        if (eventId === Mocha.Runner.constants.EVENT_TEST_BEGIN) {
          eventHandler = (...eventArgs) => {
            // eslint-disable-next-line no-param-reassign
            eventArgs[0].state = 'running';

            process(...eventArgs);
          };
        } else if (eventId === Mocha.Runner.constants.EVENT_RUN_END) {
          return acc;
        }

        return acc.on(eventId, eventHandler);
      },
      this.instance.run()
    );
  }
}
