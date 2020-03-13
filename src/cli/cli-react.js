// "use strict";

// require("core-js/modules/es.array.concat");

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;

import client from "@storybook/core/client";

// require("./globals");

// var _render = _interopRequireDefault(require("./render"));

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prefer-destructuring */
const framework = 'react';
const api = client.start(() => { debugger; }); // (0, _client.start)(_render["default"]);

// function storiesOf(kind, m) {
//   return api.clientApi.storiesOf(kind, m).addParameters({
//     framework: framework
//   });
// };

// exports.storiesOf = storiesOf;

export function configure(...args) {
  api.configure.apply(api, args.concat([framework]));

  return api;
};
