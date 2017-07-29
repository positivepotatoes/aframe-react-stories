import React from 'react';

const VRNext = (props) => (
  <a-entity position='0 0 -3' rotation='0 0 270' 
    id='next'
    animation__playpos={props.animations('storyplaying', 'moveTo', '.3 -2 -3')}
    animation__pausepos={props.animations('storystopping', 'moveTo', '0 0 -3')}
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
      animation__color={props.animations('always', 'fadingTo', '#8e8e8e')}
      animation__bounce={props.animations('always', 'tiltingTo', '1.8')}

      animation__playsize={props.animations('storyplaying', 'scaleTo', '.5 .5 .5')}
      animation__pausesize={props.animations('storystopping', 'scaleTo', '1 1 1')}
    />
    <a-text 
      id='nexttext'
      value='Next'
      width='2'
      opacity='0'
      align='center'
      rotation='0 0 90'
      position='.23 0 0'
      animation__showtext={props.animations('storyplaying', 'fadeTextTo', '1')}
      animation__hidetext={props.animations('storystopping', 'fadeTextTo', '0')}
    />
  </a-entity>
);

export default VRNext;