import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Dialog } from 'material-ui';
import { green800 } from 'material-ui/styles/colors';

const BingDialog = props => (
  <Dialog
    autoScrollBodyContent
    onRequestClose={props.onRequestClose}
    open={props.open}
  >
    <ul style={{ listStyleType: 'none' }}>
      {_.map(props.result, (webpage, index) => (
        <li key={index}>
          <a
            href={webpage.displayUrl}
            style={{ fontSize: 18 }}
            target="_blank"
          >
            {webpage.name}
          </a>
          <br />
          <span
            style={{
              color: green800,
              fontSize: 14,
            }}
          >
            {webpage.displayUrl}
          </span>
          <br />
          {webpage.snippet}<br /><br />
        </li>
      ))}
    </ul>
  </Dialog>
);

BingDialog.defaultProps = {
  result: [],
};

BingDialog.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  result: PropTypes.arrayOf(PropTypes.shape),
};

export default BingDialog;
