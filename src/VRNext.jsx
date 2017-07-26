import React from 'react';
import 'aframe-animation-component';

const VRNext = (props) => {



  const clickPlay = () => {
    props.playNext();
    // animation__y = 'property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: 90 0 0; to: -90 0 0';
    // animation__y = null;
    // console.log(document.getElementById('playnextbutton'))
    
    // document.getElementById('playnextbutton').emit('initializeplay')

  }

  return (
    <a-entity position='0 0 -3' rotation='0 0 270' >
      
      <a-cone 
      id='playnextbutton'
        color='#bcbcbc'
        // metalness='.9'
        onClick={clickPlay}
        height='.4'
        radius-top='.01'
        radius-bottom='.24'
        material='transparent: true; opacity: .6'
        // animation__x='property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; to: 40 0 0'
        animation__y='property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: 0 0 2.5; to: 0 0 -1.5'
        animation__color='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: #8e8e8e'

        animation__playingmove='property: position; dur: 800; easing: easeInOutQuart; repeat: 1; to: 2 0 0; startEvents: initializeplay'
        animation__playingturn='property: rotation; dur: 800; easing: easeInSine; repeat: 1; from: 0 0 2.5; to: -90 0 0; startEvents: initializeplay'
        // animation__x={animation__x}
      >
      </a-cone>
      
    </a-entity>
  )
};

export default VRNext;