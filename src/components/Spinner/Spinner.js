/* eslint-disable linebreak-style */
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #00bcd4;
  border-radius: 50%;
  width: 2.2rem;
  height: 2.2rem;
  animation: ${spin} 0.6s linear infinite;
  position: fixed;
  top: 50%;
  bottom: 50%;
  left: 50%;
`;

export default Spinner;
