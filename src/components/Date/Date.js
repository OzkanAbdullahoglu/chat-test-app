/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import './Date.css';
const Date = ({
  pack,
}) => (
  <div className="list-item-date-root">
    <div className="list-item-date-text-primary timestamp">
      <span>{pack.date}</span>
    </div>
  </div>
);

Date.propTypes = {
  pack: PropTypes.object,
};

export default Date;
