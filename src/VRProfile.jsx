import React from 'react';

const VRProfile = props => {
  let picRadius = 1;
  let spacing = 0.2;


  let animateScaleClick, animateScaleMove, progressBar, progressBarTotal;
  if (props.currentStory.id === props.friend.profile.id) {
    animateScaleClick = {property: 'scale', dir: 'alternate', dur: 100, easing: 'easeInOutQuad', repeat: 1, to: '1.12 1.12 1.12'};
    // animateScaleMove = {property: 'position', dir: 'to', dur: 200, easing: 'easeInOutQuad', repeat: 1, to: `0 3 0`};
    picRadius = 1.2;

    let current = props.currentStoriesDuration.current;
    let max = props.currentStoriesDuration.total;
    let ratioCompleted = current / max;
    
    let progressRadius = .1;
    let progress = ratioCompleted * picRadius * 2;
    let progressXPos = -picRadius + (picRadius * ratioCompleted);
    let progressYPos = -picRadius * 1.45;
    
    progressBar = 
      <a-cylinder
        radius={progressRadius} 
        height={progress}
        rotation='0 0 90'
        color='#89b6ff' 
        opacity='0.8'
        position={`${progressXPos} ${progressYPos} 0`}
      />;

    progressBarTotal = 
      <a-cylinder
        radius={progressRadius} 
        height={picRadius * 2}
        rotation='0 0 90'
        color='#b2b2b2'
        opacity='0.3'
        position={`0 ${progressYPos} 0`}
      />;
  }
  //* animation__move={animateScaleMove} */
  return (
    <a-entity position={`${props.x} ${props.y}, ${props.z}`} rotation={`${props.xRotation} ${props.yRotation} ${0}`}>
      <a-cylinder 
        className={'friend'} 
        radius={picRadius}
        height='0.15'
        rotation="0 90 90"
        material={`src: ${props.friend.profile.img_url}`}
        // animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
        // animation__yoyo={{property: 'position', dir: 'alternate', dur: 1000, easing: 'easeInSine', loop: true, to: '0 2 0'}}
        onClick={() => props.onFriendClick(props.friend)}
      />
      {/* <a-animation {animateScaleClick}/> */}
      <a-text 
        value={props.friend.profile.first} 
        align='center' 
        color='white'
        width='6'
        position={`0 ${- picRadius * 1.2} 0`}
        
      />
      {progressBar}
      {progressBarTotal}
    </a-entity>
  );
};

export default VRProfile;
