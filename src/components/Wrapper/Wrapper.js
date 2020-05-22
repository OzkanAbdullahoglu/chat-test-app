/* eslint-disable linebreak-style */
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: ${(props) =>
    props.incomingIcon || props.incomingAvatar || props.sendIcon ? '40px' : '20px'};
  height: ${(props) =>
    props.incomingIcon || props.incomingAvatar || props.sendIcon ? '40px' : '20px'};
  display: ${(props) => (props.scrollDown && props.appearance ? 'none' : 'flex')};
  position: ${(props) => (props.sendIcon || props.scrollDown ? 'absolute' : 'relative')};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${(props) => (props.incomingIcon ? ' #fff' : '#00bcd4')};
  border: ${(props) => (props.incomingIcon ? '1px solid #00bcd4' : 'none')};
  cursor: ${(props) => (props.scrollDown ? 'pointer' : 'auto')};
  margin: ${(props) => (props.scrollDown ? '0 7px 0 0' : '0 7px 0 10px')};
  right: ${(props) => (props.sendIcon || props.scrollDown ? '0' : 'inherit')};
  bottom: ${(props) => (props.sendIcon ? '10px' : 'inherit')};
  box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  -o-box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  z-index: 2;
  &:hover {
    background: ${(props) => (props.scrollDown ? '#00bcd4' : '#00bcd4')};
    color: #fff
  };
  &:focus {
    outline: '1px solid black';
    outline-offset: -4px;
  }
`;

