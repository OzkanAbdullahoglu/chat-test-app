/* eslint-disable linebreak-style */
import styled from 'styled-components';
import { Wrapper } from '../Wrapper/Wrapper';

const SvgIcon = styled.svg`
  fill: currentColor;
  width: ${(props) => (props.sendIcon ? '1.5em' : '2em')};
  height: ${(props) => (props.sendIcon ? '1.5em' : '2em')};
  font-size: ${(props) => (props.incomingAvatar ? '1.5rem' : '1rem')};
  color: ${(props) => (props.incomingIcon ? '#00bcd4' : '#fff')};
  margin-right: ${(props) => (props.incomingIcon ? '0.1rem' : 0)};
  position: ${(props) => (props.sendIcon ? 'absolute' : 'relative')};
  transform: ${(props) => (props.scrollDown ? 'rotate(90deg)' :
    props.incomingIcon ? 'rotate(180deg)' :
      'rotate(0)')};

   ${Wrapper}:hover & {
    color: #fff
  };
`;

export default SvgIcon;
