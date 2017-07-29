import React from 'react';

const VRNext = (props) => (
  <a-entity position='0 0 -3' rotation='0 0 270' 
    id='next'
    animation__playpos='property: position; dur: 800; easing: easeInOutSine; to: .3 -2 -3; startEvents: initializeplay'
    animation__pausepos='property: position; dur: 800; easing: easeInOutSine; to: 0 0 -3; startEvents: finishplay'
  >
    <a-cone 
      id='nextbutton'
      color='#c6c6c6'
      height='.47'
      radius-top='.008'
      radius-bottom='.26'
      onClick={props.playNext}
      material='transparent: true; opacity: .55'

      //ALWAYS PLAYING
      animation__color='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: #8e8e8e'
      animation__bounce='property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: 0 0 1.8; to: 0 0 -1.8'

      //WHEN PLAYING STORY
      animation__playsize='property: scale; dur: 800; easing: easeInOutSine; to: .5 .5 .5; startEvents: initializeplay'

      //WHEN STORY FINISHED
      animation__pausesize='property: scale; dur: 800; easing: easeInOutSine; to: 1 1 1; startEvents: finishplay'
    />
    <a-text 
      id='nexttext'
      value='Next'
      align='center'
      opacity='0'
      width='2'
      position='.23 0 0'
      rotation='0 0 90'
      animation__stoptext='property: opacity; dur: 1200; easing: easeInSine; to: 0; startEvents: finishplay'
      animation__playtext='property: opacity; dur: 1200; easing: easeInSine; to: 1; startEvents: initializeplay'
    />
  </a-entity>
);

export default VRNext;