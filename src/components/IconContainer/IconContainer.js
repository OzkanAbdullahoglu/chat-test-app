/* eslint-disable linebreak-style */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../Icon/Icon';


const IconContainer = ({
  incomingIcon,
  incomingAvatar,
  scrollDown,
  handleClick,
  viewBox,
  arrow,
}) => (
  <SvgIcon
    incomingIcon={incomingIcon}
    incomingAvatar={incomingAvatar}
    scrollDown={scrollDown}
    viewBox={viewBox}
    onClick={handleClick}
    data-test="svg-icon"
  >
    {arrow ? (
      <path xmlns="http://www.w3.org/2000/svg" d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z" />
    ) : (
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    )
    }
  </SvgIcon>
);

IconContainer.propTypes = {
  incomingIcon: PropTypes.bool,
  scrollDown: PropTypes.bool,
  arrow: PropTypes.bool,
  incomingAvatar: PropTypes.bool,
  viewBox: PropTypes.string,
  handleClick: PropTypes.func,
};

export default IconContainer;
