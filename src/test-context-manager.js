import isNil from 'lodash/isNil';
import TextContext from './test-context';

export default class TestContextManager {
  constructor() {
    this.contexts = {};
  }

  activateContext(id, name, spec, handler) {
    if (!isNil(this.contexts[id])) {
      this.activeContext.disconnect();

      this.activeContext = this.contexts[id];

      this.activeContext.connect(handler);

      return;
    }

    const newContext = new TextContext(id, name, spec);

    this.contexts[id] = newContext;
    this.activeContext = newContext;

    newContext.connect(handler);

    newContext.run();
  }
}
