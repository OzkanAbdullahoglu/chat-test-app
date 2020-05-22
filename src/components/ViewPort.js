/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';

function getCurrentViewDims() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useCurrentViewDims() {
  const [windowDimensions, setWindowDimensions] = useState(getCurrentViewDims());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getCurrentViewDims());
    }

    window.addEventListener('scroll', handleResize);
    return () => window.removeEventListener('scroll', handleResize);
  }, []);

  return windowDimensions;
}
