/* eslint-disable linebreak-style */
import styled from 'styled-components';
import { Wrapper } from '../Wrapper/Wrapper';

export const Icon = styled.svg`
  fill: currentColor;
  width: ${(props) => (props.sendIcon ? '1.5em' : '1em')};
  height: ${(props) => (props.sendIcon ? '1.5em' : '1em')};
  font-size: ${(props) => (props.incomingAvatar ? '1.5rem' : '1rem')};
  color: ${(props) => (props.incomingIcon ? '#00bcd4' : '#fff')};
  margin-right: ${(props) => (props.incomingIcon ? '0.1rem' : 0)};
  position: ${(props) => (props.sendIcon ? 'fixed' : 'relative')};
  transform: ${(props) => (props.scrollDown ? 'rotate(-90deg)' : 0)};
  cursor: ${(props) => (props.sendIcon || props.scrollDown ? 'pointer' : 'auto')};
   ${Wrapper}:hover & {
    color: #fff
  };
`;