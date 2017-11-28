import React from 'react';
import { Toggle } from 'material-ui';

const BuyRentToggle = () => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
    }}
  >
    <p>BUY</p>
    <Toggle
      style={{
        width: 55,
      }}
      thumbStyle={{
        backgroundColor: '#00bcd4',
      }}
      trackStyle={{
        backgroundColor: '#80deea',
      }}
    />
    <p>RENT</p>
  </div>
);

export default BuyRentToggle;
