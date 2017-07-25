import React from 'react';
import ReactDOM from 'react-dom';

const VRPrimitive = (props) => {
  let src = '#' + props.currentStory.id + ',' + props.currentStory.index;
  let primitive = <a-videosphere src={src} rotation="0 -90 0"/>;
  
  if (props.currentStory.type.slice(0, 5) === 'image') {
    primitive = <a-sky src={src} rotation="0 -90 0"/>;
  }

  return (
    <a-entity>
      {primitive}
    </a-entity>
  );
};

export default VRPrimitive;