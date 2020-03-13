import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { upperCaseFirst } from 'upper-case-first';
import SpecTest from './spec-test';

function renderState(statusId, status) {
  const amount = status[statusId];

  if (amount <= 0) {
    return null;
  }

  return (
    <span
      className={`spec-runner-suite-state ${statusId}`}
    >
      {`${amount} ${upperCaseFirst(statusId)}`}
    </span>
  );
}

class SpecSuite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { suite } = this.props;

    return (
      <div className="spec-runner-suite">
        <div className="spec-runner-suite-header">
          <span className="spec-runner-suite-title">{suite.title}</span>
          {renderState('pending', suite.status)}
          {renderState('running', suite.status)}
          {renderState('passed', suite.status)}
          {renderState('failed', suite.status)}
        </div>
        <div className="spec-runner-suite-contents">
          {map(suite.tests, (childTest, index) => (
            <SpecTest key={index} {...childTest} />
          ))}
          {map(suite.suites, (childSuite, index) => (
            <SpecSuite key={index} suite={childSuite} />
          ))}
        </div>
      </div>
    );
  }
}

SpecSuite.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  suite: PropTypes.any
};

SpecSuite.defaultProps = {
  suite: null
};

export default SpecSuite;
