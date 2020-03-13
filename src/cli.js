/* eslint-disable no-debugger */
import program from 'commander';
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import forEach from 'lodash/forEach';
import cliReact from './cli/cli-react';
// import TestContext from  './test-context';

function collect(value, previous) {
  return previous.concat([value]);
}

const p = program
  .version('0.0.1')
  .requiredOption('-s, --stories <stories>', 'stories')
  .option('-r, --require <require>', 'require', collect, [])
  .parse(process.argv);

debugger;

const cwd = (exports.cwd = process.cwd());

p.require.forEach(mod => {
  let modpath = mod;

  if (fs.existsSync(mod, { cwd }) || fs.existsSync(`${mod}.js`, { cwd })) {
    modpath = path.resolve(mod);
    // debug(`resolved ${mod} to ${modpath}`);
  }

  require(modpath);

  // debug(`loaded require "${mod}"`);
});

const globConfig = {
  realpath: true
};

glob(p.stories, globConfig, (er, stories) => {
  forEach(stories, file => {
    debugger;

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const story = require(file);

    const ret = story.basic.story.decorators[0]();
  });
});

debugger;

const api = cliReact();

debugger;

// const testContext = new TestContext();



// import TestContextManager from './test-context-manager';

// const testContextManager = new TestContextManager();

// load Files

// testContextManager.activateContext(id, name, spec, (state) => {
//   channel.emit('spec-runner/update', state);
// });

// export default function defineSpec(spec) {
//   return makeDecorator({
//     name: 'spec-runner',
//     wrapper: (getStory, storyContext) => {
//       const { id, name } = storyContext;

//       const channel = addons.getChannel();

//       testContextManager.activateContext(id, name, spec, (state) => {
//         channel.emit('spec-runner/update', state);
//       });

//       return getStory(storyContext);
//     }
//   })
// }
