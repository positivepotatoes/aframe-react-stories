import React from 'react';

const VRExit = (props) => {
  const animateWhen = props.animations;

  return (
    <a-entity position='0 -2 -3'
      id='exit'
      animation__playpos={animateWhen('playing', 'moveTo', '-.3 -2 -3')}
      animation__pausepos={animateWhen('stopping', 'moveTo', '0 -2 -3')}
    >
      <a-sphere
        id='exitbutton'
        radius='.135'
        rotation= '76 0 0'
        color='#c6c6c6'
        material='transparent: true; opacity: .48'
        onClick={() => {
          props.setSplashScreen();
          if (props.currentStory.index === -2) {
            props.exitCallback();
          }
        }}
        //ALWAYS PLAYING
        animation__color={animateWhen('always', 'fadingTo', '#8e8e8e')}
        animation__shrinking={animateWhen('always', 'shrinkingTo', '.95 .95 .95')}
        
      />
      <a-text 
        id='exittext1'
        value='Exit'
        width='2'
        align='center'
        position='0 -.13 .12'
        animation__showtext={animateWhen('stopping', 'fadeTextTo', '1')}
        animation__hidetext={animateWhen('playing', 'fadeTextTo', '0')}
      />
      <a-text 
        id='exittext2'
        value='Stop'
        width='2'
        opacity='0'
        align='center'
        position='0 -.13 .12'
        animation__showtext={animateWhen('playing', 'fadeTextTo', '1')}
        animation__hidetext={animateWhen('stopping', 'fadeTextTo', '0')}
      />
    </a-entity>
  )
};

export default VRExit;