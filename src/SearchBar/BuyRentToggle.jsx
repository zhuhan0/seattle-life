import React from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'material-ui';

const BuyRentToggle = props => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
    }}
  >
    <p>BUY</p>
    <Toggle
      onToggle={props.onToggle}
      style={{
        width: 55,
      }}
      thumbStyle={{
        backgroundColor: '#00bcd4',
      }}
      toggled={props.toggled}
      trackStyle={{
        backgroundColor: '#80deea',
      }}
    />
    <p>RENT</p>
  </div>
);

BuyRentToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
};

export default BuyRentToggle;
