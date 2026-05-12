import React from 'react';
import preloader from '@/assets/images/icon/Spinner.gif';

const Preloader = ({ width, height }) => {
  return <img src={preloader} alt="Loading..." style={{ width, height, margin: '0 auto' }} />;
};

export default Preloader;
