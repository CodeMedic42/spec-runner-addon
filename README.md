# spec-runner-addon
An addon for storybook for running mocha tests per story.

## Disclaimer
This is a very new, slightly hacky, and very specific solution. It is currently built for my needs and is yet still lacking.

### Framework support
I built this to test a library of React components. Therefor I have not tested this with any other framework besides React.

### Storybook
I also built this trying to work within the boundaries of Storybook. This was harder than I had expected. There might be a better way.

### Test Runner
I wanted to have the tests run in the browser and individually with the stories. THIS WAS DIFFICULT. Mocha was the only test runner which had ANY documentation on running in the browser and it still did not cover what I needed. After much debugging ans exploring I have what you will see here.

I would have loved to load mocha as an import but it seems that this does not work. I have to load it and let it bind to the window. SMH. It creates a lot of stuff there including the normal testing controls to define a test suite and tests. These are not to be used. I also manually remove clean them up so that no one tries to use them. As you will see I provide the controls in a different manner so that the tests are ran as the story loads.

### CLI
I also want to make this run the tests through the cli. I would LOVE LOVE LOVE to utilize the storybook system to load the stories and then run the tests. I have been trying to figure out how to do this but Storybook is CO-HAM-AM-PLEX. I am currently seeking help to figure this out.

## Getting Started

### NPM
I have not uploaded this to either yet.

### GitHub
1. Either download or clone the repo
2. Execute
  ```bash
  npm install
  ```

## Use in storybook
This addon was built to allow a user to assign tests to a story and make those tests integral with the story.

I also wanted to have the tests be debuggable in the browser. 

### Hook it in!
To get started the first step is to hook this bad boy into storybook.

```js
// ./.storybook/main.js

module.exports = {
  // Other settings
  addons: [
    // Just be sure to add the addon here with the rest of your addons.
    "spec-runner-addon/dist/register", 
  ],
};
```

### Client Initialization
I use enzyme to mount and verify much of my components. But it needs to be initialized. Storybook does provide a place to do that.

```js
// ./.storybook/preview.js

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

### Define your tests.
This addon use mocha as the test runner but that is the only limitation. In this test example you will see that I am using chai and enzyme to test a React component.

```jsx
// ./example.story.js

import React from 'react';
import Chai from 'chai';
import { mount } from 'enzyme';
import { defineSpec } from 'spec-runner-addon';

const { expect } = Chai;

function example() {
  return <span>Button Text</span>;
}

example.story = {
  name: 'Example',
  decorators: [
    defineSpec(({ describe, it /* all other mocha controls come from here */ }) => {
      describe('Example Suite', () => {
        it('Example Test', () => {
          const output = mount(example());

          expect(output.text()).to.equal('Button Text');
        });
      });
    })
  ]
};

export default example;
```

This supports all the expected mocha controls

- xdescribe
- xit
- before
- beforeEach
- after
- afterEach
- run

Each group of specs will only run once the story load and will run after you reload the browser.

## Future

I want to make a cli command line tool to run these tests. I would LOVE to be able to use the storybook system to load the stories and run the tests without any additional configuration.

I would live to get some code coverage output as well.
