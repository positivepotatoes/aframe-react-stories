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
        color='#c6c6c6'
        height='.47'
        radius-top='.008'
        radius-bottom='.26'
        onClick={clickPlay}
        material='transparent: true; opacity: .6'

        //ALWAYS PLAYING
        animation__color='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: #8e8e8e'
        // animation__bounce='property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: -1.5 0 1.5; to: 1.5 0 -1.5'

        //PLAYING STORY
        animation__playpos='property: position; dur: 800; easing: easeInOutSine; repeat: 1; to: 2 -.14 0; startEvents: initializeplay; pauseEvents: finishedplay'
        animation__playsize='property: scale; dur: 800; easing: easeInOutSine; repeat: 1; to: .5 .5 .5; startEvents: initializeplay; pauseEvents: finishedplay'

        //WHEN STORY FINISHED
        animation__pausepos='property: position; dur: 800; easing: easeInOutSine; repeat: 1; to: 0 0 0; startEvents: finishedplay; pauseEvents: initializeplay'
        animation__pausesize='property: scale; dur: 800; easing: easeInOutSine; repeat: 1; to: 1 1 1; startEvents: finishedplay; pauseEvents: initializeplay'
        

      >
      </a-cone>

      <a-cylinder
        color='#c6c6c6'
        height='.08'
        radius='.27'
        position='4 .10 -3'
      >
      </a-cylinder>
      
    </a-entity>
  )
};

export default VRNext;