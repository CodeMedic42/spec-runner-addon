import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { addons, types } from '@storybook/addons';
import { useChannel } from '@storybook/api';
import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import SpecView from './spec-view';
import './styles.scss';

const ADDON_ID = 'spec-runner';
const PARAM_KEY = 'spec-runner';
const PANEL_ID = `${ADDON_ID}/panel`;

function render({ active, key }) {
  const [rootSuite, setState] = useState(null);

  const channels = {
    [STORY_CHANGED]: () => {
      setState(null);
    },
    'spec-runner/update': setState
  };

  useChannel(channels);

  if (isNil(rootSuite)) {
    return null;
  }

  return (
    <AddonPanel active={active} key={key}>
      <SpecView rootSuite={rootSuite} />
    </AddonPanel>
  );
}

render.propTypes = {
  active: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Specification',
    render,
    paramKey: PARAM_KEY
  });
});
