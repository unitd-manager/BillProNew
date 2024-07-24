import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Load.json';
/* eslint-disable */
const GlobeLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    renderer: 'svg',
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={70} width={200} />
    </div>
  );
};

export default GlobeLottie;
