import React from 'react';
import { IconButton } from 'material-ui';
import { cyan400 } from 'material-ui/styles/colors';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

const BedroomButtons = () => (
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
        iconStyle={{
          color: cyan400,
          height: 30,
          width: 30,
        }}
        style={{
          height: 54,
          paddding: 12,
          width: 54,
        }}
      >
        <ContentRemoveCircle />
      </IconButton>
      <p>0</p>
      <IconButton
        iconStyle={{
          color: cyan400,
          height: 30,
          width: 30,
        }}
        style={{
          height: 54,
          paddding: 12,
          width: 54,
        }}
      >
        <ContentAddCircle />
      </IconButton>
    </div>
  </div>
);

export default BedroomButtons;
