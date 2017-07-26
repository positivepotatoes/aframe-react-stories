import React from 'react';

const VRExit = (props) => (
  <a-entity position='0 0 -3'>
    <a-cylinder id='cylinder'
      radius='0.1'
      position='0 -5.2 -10'
      rotation= '0 90 90'
      color='red'
      onClick={props.exitCallback}
    />
    <a-text 
      value='click me to exit'
      align='center' 
      color='white'
      width='6'
      position='0 -5 -10'
    />
  </a-entity>
);

export default VRExit;