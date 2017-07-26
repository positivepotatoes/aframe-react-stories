import React from 'react';
import 'aframe-animation-component';

const VRNext = (props) => {

  let animation__y = 'property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: 0 0 1.5; to: 0 0 -1.5';
  let animation__x;

  const clickPlay = () => {
    console.log('u clicked');
    animation__y = 'property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: 90 0 0; to: -90 0 0';
    // animation__y = null;
    props.playNext();
  }

  return (
    <a-entity position='0 0 -3' rotation='0 0 270'>
      
      <a-cone 
        color='#bcbcbc'
        // metalness='.9'
        onClick={clickPlay}
        radius-top='0'
        radius-bottom='.5'
        material='transparent: true; opacity: .6'
        // animation__x='property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; to: 40 0 0'
        animation__y={animation__y}
        // animation__x={animation__x}
        animation__color="property: color; dir: alternate; dur: 900;
                             easing: easeInSine; loop: true; to: #8e8e8e"
      >
      </a-cone>
      
    </a-entity>
  )
};

export default VRNext;