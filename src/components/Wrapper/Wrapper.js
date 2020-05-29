/* eslint-disable linebreak-style */
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: ${(props) =>
    props.incomingIcon || props.incomingAvatar || props.sendIcon
      ? '40px'
      : '20px'};
  height: ${(props) =>
    props.incomingIcon || props.incomingAvatar || props.sendIcon
      ? '40px'
      : '20px'};
  display: flex;
  opacity: ${(props) => (props.hideButton ? 0 : 1)};
  transition-property: opacity;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  transition-delay: 0.1s;
  position: ${(props) =>
    props.sendIcon ? 'absolute' : props.scrollDown ? 'sticky' : 'relative'};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${(props) => (props.incomingIcon ? ' #fff' : '#00bcd4')};
  border: ${(props) => (props.incomingIcon ? '1px solid #00bcd4' : 'none')};
  cursor: ${(props) =>
    props.scrollDown || props.incomingIcon || props.sendIcon
      ? 'pointer'
      : 'auto'};
  margin: ${(props) => (props.scrollDown ? '0 10px 0 0' : '0 7px 0 10px')};
  right: ${(props) => (props.sendIcon || props.scrollDown ? '0' : 'inherit')};
  bottom: ${(props) => (props.sendIcon ? '10px' : 'inherit')};
  top: ${(props) =>
    props.scrollDown ? '625px' : props.sendIcon ? '10px' : '0'};
  left: ${(props) => (props.scrollDown ? '410px' : 'inherit')};
  box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  -o-box-shadow: 0.1em 0.1em rgba(0, 0, 0, 0.12);
  z-index: 2;
  &:hover {
    background: ${(props) =>
    props.scrollDown || props.incomingIcon ? '#00bcd4' : '#00bcd4'};
    color: #fff;
  }
  &:focus {
    outline: '1px solid black';
    outline-offset: -4px;
  }

  @media (max-height: 1370px) and (max-width: 1024px) {
    top: ${(props) =>
    props.scrollDown ? '1250px' : props.sendIcon ? '10px' : '0'};
    left: ${(props) => (props.scrollDown ? '390px' : 'inherit')};
  }

  @media (max-height: 1024px) and (max-width: 770px) {
    top: ${(props) =>
    props.scrollDown ? '900px' : props.sendIcon ? '10px' : '0'};
    left: ${(props) => (props.scrollDown ? '380px' : 'inherit')};
  }
  @media (max-height: 823px) and (max-width: 415px) {
    top: ${(props) =>
    props.scrollDown ? '600px' : props.sendIcon ? '10px' : '0'};
    left: ${(props) => (props.scrollDown ? '310px' : 'inherit')};
  }
  @media (max-height: 670px) and (max-width: 375px) {
    top: ${(props) =>
    props.scrollDown ? '500px' : props.sendIcon ? '10px' : '0'};
    left: ${(props) => (props.scrollDown ? '300px' : 'inherit')};
  }
  @media (max-height: 640px) and (max-width: 360px) {
    top: ${(props) =>
    props.scrollDown ? '475px' : props.sendIcon ? '10px' : '0'};
    left: ${(props) => (props.scrollDown ? '300px' : 'inherit')};
  }

  @media (max-height: 570px) and (max-width: 320px) {
    top: ${(props) =>
    props.scrollDown ? '440px' : props.sendIcon ? '10px' : '0'};
    left: ${(props) => (props.scrollDown ? '250px' : 'inherit')};
  }
`;
