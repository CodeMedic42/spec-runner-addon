import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { upperCaseFirst } from 'upper-case-first';

class SpecTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { status, title, message } = this.props;

    let errorMessageElement = null;

    if (status === 'failed') {
      errorMessageElement = (
        <div className="spec-runner-test-title-error">{message}</div>
      );
    }

    return (
      <div className="spec-runner-test">
        <div className="spec-runner-test-header">
          <span className="spec-runner-test-title">{title}</span>
          <span className={classnames('spec-runner-test-state', status)}>
            {upperCaseFirst(status)}
          </span>
        </div>
        <div className="spec-runner-test-contents">{errorMessageElement}</div>
      </div>
    );
  }
}

SpecTest.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
};

SpecTest.defaultProps = {
  status: null,
  title: null,
  message: null
};

export default SpecTest;
