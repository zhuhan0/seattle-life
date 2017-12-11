import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';

const BingButton = props => (
  <IconButton
    onClick={props.onClick}
    style={{
      height: 24,
      padding: 0,
      width: 24,
    }}
    tooltip="Bing Search"
    tooltipStyles={{ marginTop: -20 }}
  >
    {<svg enableBackground="new 0 0 512 512" id="Layer_1" version="1.1" viewBox="0 0 512 512"><g><path d="M172.1,363.1c52.7-27.8,104.9-55.2,157.8-83.1c-14.2-6.5-27.5-12.5-40.8-18.5c-10.2-4.6-20.3-9.1-30.5-13.7   c-2.4-1-4-2.5-5.2-5c-15.7-34.2-31.5-68.3-47.2-102.4c-0.5-1-0.8-2.1-1.5-4c11.5,3.5,22.3,6.8,33,10.1c45,13.8,90,27.6,135,41.4   c25.9,7.9,51.8,16,77.8,23.7c3.6,1.1,4.4,2.8,4.4,6.3c-0.1,37.7-0.1,75.3,0,113c0,3.2-0.9,4.9-3.7,6.6   c-88.9,52.8-177.8,105.8-266.7,158.8c-4,2.4-8.1,4.6-12,7.2c-2,1.4-3.4,1-5.2-0.3c-36.1-25.3-72.2-50.6-108.3-75.9   c-1.8-1.3-2.6-2.7-2.5-5c0.1-6.7,0-13.3,0-20c0-101.6,0.1-203.3,0.1-304.9c0-28.3,0-56.7-0.2-85c0-4.4,1-4.9,5-3.6   c35.2,12.1,70.5,24.1,105.8,36c3,1,3.6,2.7,3.6,5.5c0,20.5,0,41,0.1,61.5c0.4,82.1,0.8,164.3,1.2,246.4   C172.1,359.7,172.1,361,172.1,363.1z" fill="#0D8484" /></g></svg>}
  </IconButton>
);

BingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BingButton;
