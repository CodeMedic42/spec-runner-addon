import React from 'react';
import PropTypes from 'prop-types';
import SpecSuite from './spec-suite';

class SpecView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { rootSuite } = this.props;

    return (
      <div className="spec-runner-view">
        <SpecSuite suite={rootSuite} />
      </div>
    );
  }
}

SpecView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rootSuite: PropTypes.any
};

SpecView.defaultProps = {
  rootSuite: null
};

export default SpecView;
