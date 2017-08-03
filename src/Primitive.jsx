import React from 'react';

const Primitive = (props) => {
  let src = '#' + props.currentStory.id + ',' + props.currentStory.index;
  let primitive = <a-videosphere src={src} rotation="0 -90 0"/>;
  
  if (props.currentStory.type.slice(0, 5) === 'image') {
    primitive = <a-sky src={src} rotation="0 -90 0" material='npot:true'/>;
  }

  return (
    <a-entity>
      {primitive}
    </a-entity>
  );
};

export default Primitive;