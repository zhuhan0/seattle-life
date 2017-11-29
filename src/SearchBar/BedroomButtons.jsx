import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { cyan400 } from 'material-ui/styles/colors';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

const iconStyle = {
  color: cyan400,
  height: 30,
  width: 30,
};

const buttonStyle = {
  height: 54,
  paddding: 12,
  width: 54,
};

const BedroomButtons = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: 170,
    }}
  >
    <p>Bedrooms</p>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: 80,
      }}
    >
      <IconButton
        disabled={props.minusDisabled}
        iconStyle={iconStyle}
        onClick={props.onMinusClick}
        style={buttonStyle}
      >
        <ContentRemoveCircle />
      </IconButton>
      <p>{props.bedrooms}</p>
      <IconButton
        disabled={props.plusDisabled}
        iconStyle={iconStyle}
        onClick={props.onPlusClick}
        style={buttonStyle}
      >
        <ContentAddCircle />
      </IconButton>
    </div>
  </div>
);

BedroomButtons.propTypes = {
  bedrooms: PropTypes.number.isRequired,
  minusDisabled: PropTypes.bool.isRequired,
  onMinusClick: PropTypes.func.isRequired,
  onPlusClick: PropTypes.func.isRequired,
  plusDisabled: PropTypes.bool.isRequired,
};

export default BedroomButtons;
