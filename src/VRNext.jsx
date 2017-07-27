import React from 'react';

const VRNext = (props) => (
  <a-entity position='0 0 -3' rotation='0 0 270' >
    <a-cone 
      id='playnextbutton'
      color='#c6c6c6'
      height='.47'
      radius-top='.008'
      radius-bottom='.26'
      onClick={props.playNext}
      material='transparent: true; opacity: .6'

      //ALWAYS PLAYING
      animation__color='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: #8e8e8e'
      animation__bounce='property: rotation; dir: alternate; dur: 800; easing: easeInSine; loop: true; from: 0 0 1.8; to: 0 0 -1.8'

      //WHEN PLAYING STORY
      animation__playpos='property: position; dur: 800; easing: easeInOutSine; repeat: 1; to: 2.05 0 0; startEvents: initializeplay; pauseEvents: finishedplay'
      animation__playsize='property: scale; dur: 800; easing: easeInOutSine; repeat: 1; to: .5 .5 .5; startEvents: initializeplay; pauseEvents: finishedplay'

      //WHEN STORY FINISHED
      animation__pausepos='property: position; dur: 800; easing: easeInOutSine; repeat: 1; to: 0 0 0; startEvents: finishedplay; pauseEvents: initializeplay'
      animation__pausesize='property: scale; dur: 800; easing: easeInOutSine; repeat: 1; to: 1 1 1; startEvents: finishedplay; pauseEvents: initializeplay'
    >
    </a-cone>

    {/* THE CYLINDER BELOW WAS USED TO PUT A BAR NEXT TO PLAY BUTTON FOR VISUAL PURPOSES. WILL NOT IMPLEMENT FOR NOW
    <a-cylinder
      id='playnextbutton'
      color='#c6c6c6'
      height='.055'
      radius='.12'
      position='2.2 .13 0'
      onClick={clickPlay}
      material='transparent: true; opacity: 0.6'
    >
    </a-cylinder>
    */}
  </a-entity>
);

export default VRNext;