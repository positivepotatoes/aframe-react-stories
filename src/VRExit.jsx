import React from 'react';

const VRExit = (props) => {
  return (
    <a-entity position='0 -2 -3'
      id='exit'
      animation__playpos='property: position; dur: 800; easing: easeInOutSine; to: -.3 -2 -3; startEvents: initializeplay'
      animation__pausepos='property: position; dur: 800; easing: easeInOutSine; to: 0 -2 -3; startEvents: finishplay'
    >
      <a-sphere
        id='exitbutton'
        radius='.135'
        rotation= '76 0 0'
        color='#c6c6c6'
        material='transparent: true; opacity: .50'
        onClick={() => {
          props.setSplashScreen();
          if (props.currentStory.index === -2) {
            props.exitCallback();
          }
        }}
        //ALWAYS PLAYING
        animation__scale='property: scale; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: .95 .95 .95;'
        animation__color='property: color; dir: alternate; dur: 1100; easing: easeInSine; loop: true; to: #8e8e8e'
      />
      <a-text 
        id='exittext1'
        value='Exit'
        align='center'
        width='2'
        position='0 -.13 .12'
        animation__playtext='property: opacity; dur: 1200; easing: easeInOutSine; to: 0; startEvents: initializeplay'
        animation__stoptext='property: opacity; dur: 1200; easing: easeInOutSine; to: 1; startEvents: finishplay'
      />
      <a-text 
        id='exittext2'
        value='Stop'
        align='center'
        width='2'
        opacity='0'
        position='0 -.13 .12'
        animation__playtext='property: opacity; dur: 1200; easing: easeInOutSine; to: 0; startEvents: finishplay'
        animation__stoptext='property: opacity; dur: 1200; easing: easeInOutSine; to: 1; startEvents: initializeplay'
      />
    </a-entity>
  )
};

export default VRExit;