import React from 'react';

const VRNext = (props) => {
  const animateWhen = props.animations;
  let animationInitPos = '0 0 -3';
  let textOpacity = '0';
  let nextText = 'Next';
  let playMoveTo = '.3 -2 -3';
  let animationInitScale = { 
    height: '.47',
    top: '.008',
    bottom: '.26'
  };

  if (!props.enableAnimation) {
    animationInitPos = '.3 -2 -3';
    animationInitScale = { 
      height: '.235',
      top: '.004',
      bottom: '.13'
    };
    textOpacity = 1;
    if (props.currentStory.index === -2) {
      nextText = 'Play';
    }
  }
  
  if (!props.providedExitCallback) {
    playMoveTo = '0 -2 -3';
  }

  return (
    <a-entity position={animationInitPos} rotation='0 0 270' 
      id='next'
      animation__playpos={animateWhen('playing', 'moveTo', playMoveTo)}
      animation__pausepos={animateWhen('stopping', 'moveTo', '0 0 -3')}
    >
      <a-cone 
        id='nextbutton'
        color='#c6c6c6'
        height={animationInitScale.height}
        radius-top={animationInitScale.top}
        radius-bottom={animationInitScale.bottom}
        onClick={props.playNext}
        material='transparent: true; opacity: .55'
        //ALWAYS PLAYING
        animation__color={animateWhen('always', 'fadingTo', '#8e8e8e')}
        animation__bounce={animateWhen('always', 'tiltingTo', '1.8')}
        //SIZE TRANSITION
        animation__playsize={animateWhen('playing', 'scaleTo', '.5 .5 .5')}
        animation__pausesize={animateWhen('stopping', 'scaleTo', '1 1 1')}
      />
      <a-text 
        id='nexttext'
        value={nextText}
        width='2'
        opacity={textOpacity}
        align='center'
        rotation='0 0 90'
        position='.23 0 0'
        animation__showtext={animateWhen('playing', 'fadeTextTo', '1')}
        animation__hidetext={animateWhen('stopping', 'fadeTextTo', '0')}
      />
    </a-entity>
  )
};

export default VRNext;