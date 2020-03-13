import addons, { makeDecorator } from '@storybook/addons';
import TestContextManager from './test-context-manager';

const testContextManager = new TestContextManager();

export function defineSpec(spec) {
  return makeDecorator({
    name: 'spec-runner',
    wrapper: (getStory, storyContext) => {
      const { id, name } = storyContext;

      const channel = addons.getChannel();

      testContextManager.activateContext(id, name, spec, state => {
        channel.emit('spec-runner/update', state);
      });

      return getStory(storyContext);
    }
  });
}
