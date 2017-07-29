import React from 'react';

const VRExit = (props) => {
  return (
    <a-entity position='0 -2 -3'
        animation__playpos='property: position; dur: 800; easing: easeInOutSine; to: -.3 -2 -3; startEvents: initializeplay'
        animation__pausepos='property: position; dur: 800; easing: easeInOutSine; to: 0 -2 -3; startEvents: finishedplay'
    >
      <a-entity
        //ALWAYS PLAYING

        //WHEN PLAYING STORY

        //WHEN STORY FINISHED
      >
        <a-sphere
          id='exitbutton'
          radius='.135'
          rotation= '76 0 0'
          color='#ff0000'
          material='transparent: true; opacity: .6'
          onClick={() => {
            props.setSplashScreen();
            if (props.currentStory.index === -2) {
              props.exitCallback();
            }
          }}
          animation__scale='property: scale; dir: alternate; dur: 800; easing: easeInSine; loop: true; to: .9 .9 .9;'

          animation__transitioncolorpause='property: color; dur: 800; dir: to; easing: easeInSine; to: #ff0000; startEvents: finishedplay'
          animation__transitioncolorplay='property: color; dur: 800; dir: alternate; easing: easeInSine; from: #8e8e8e; to: #c6c6c6; startEvents: initializeplay'

          // animation__pausecolor='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; from: #c6c6c6; to: #8e8e8e; startEvents: finishedplay; delay 800'
          // animation__playcolor='property: color; dur: 800; dir: to; easing: easeInSine; repeat: 1; to: #c6c6c6; startEvents: initializeplay'
        />
        <a-text 
          id='exittext'
          value='Exit'
          align='center' 
          // color='white'
          width='2'
          position='0 -.13 .12'
          // rotation='0 0 0'
          animation__playtext='property: opacity; dur: 1200; dir: to; easing: easeInOutSine; to: 0; startEvents: initializeplay; pauseEvents: finishedplay'
          animation__stoptext='property: opacity; dur: 1200; dir: to; easing: easeInOutSine; to: 1; startEvents: finishedplay; pauseEvents: initializeplay'
        />
        <a-text 
          id='stoptext'
          value='Stop'
          align='center'
          opacity='0'
          width='2'
          position='0 -.13 .12'
          // rotation='0 0 0'
          animation__playtext='property: opacity; dur: 1200; dir: to; easing: easeInOutSine; to: 0; startEvents: finishedplay; pauseEvents: initializeplay'
          animation__stoptext='property: opacity; dur: 1200; dir: to; easing: easeInOutSine; to: 1; startEvents: initializeplay; pauseEvents: finishedplay'
        />
      </a-entity>
    </a-entity>
  )
};

export default VRExit;