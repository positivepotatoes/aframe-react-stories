import React from 'react';

const VRExit = (props) => (
  <a-entity position='0 0 10'>
    <a-cylinder id='cylinder'
      radius='.5'
      height='0.05'
      rotation= '0 90 90'
      color='#ff0000'
      material='transparent: true; opacity: .7'
      onClick={props.exitCallback}

      animation__exitcolor='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: #ff2d2d'
      animation__exitscale='property: scale; dir: alternate; dur: 1800; easing: easeInSine; loop: true; to: .940 .940 .940;'
    />
    <a-text 
      value='EXIT'
      align='center' 
      color='white'
      width='6'
      position='0 -.7 -1'
      rotation='180 0 180'
    />
  </a-entity>
);

export default VRExit;