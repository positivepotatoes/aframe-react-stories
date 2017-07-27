import React from 'react';

const VRProfile = props => {
  let picRadius = 1;
  let spacing = 0.2;


  let animateScaleClick, animateScaleMove, progressBar, progressBarTotal, storiesFraction;
  
  if (props.currentStory.id === props.friend.profile.id) {
    // animateScaleClick = {property: 'scale', dir: 'alternate', dur: 100, easing: 'easeInOutQuad', repeat: 1, to: '1.12 1.12 1.12'};
    // animateScaleMove = {property: 'position', dir: 'to', dur: 200, easing: 'easeInOutQuad', repeat: 1, to: `0 3 0`};
    // picRadius = 1.2;
    let progressRadius = .1;

    let current = props.currentStoriesDuration.current;
    let max = props.currentStoriesDuration.total;

    // let ratioCompleted = current / max;
    // let progress = ratioCompleted * picRadius * 2;
    // let progressXPos = -picRadius + (picRadius * ratioCompleted);
    
    // let ratioCompletedOfStory = props.currentStory.index / props.currentStories.length;
    // let progressOfStory = ratioCompletedOfStory * picRadius * 2;
    // let progressXPosOfStory = -picRadius + (picRadius * ratioCompletedOfStory);


    const getProgress = (i, total, radius) => {
      return i / total * radius * 2;      
    };

    const getXPosition = (i, total, radius) => {
      return -radius + (radius * i / total);
    }

    
    let progressYPos = -picRadius * 1.45;
    
    progressBar = 
      <a-cylinder
        radius={progressRadius} 
        height={getProgress(current, max, picRadius)}
        rotation='0 0 90'
        color='#54d1ff' 
        opacity='.8'
        position={`${getXPosition(current, max, picRadius)} ${progressYPos} 0`}
      />;

    storiesFraction = 
      <a-cylinder
        radius={progressRadius} 
        height={getProgress(props.currentStory.index + 1, props.currentStories.length, picRadius)}
        rotation='0 0 90'
        color='#b2b2b2' 
        opacity='0.4'
        position={`${getXPosition(props.currentStory.index + 1, props.currentStories.length, picRadius)} ${progressYPos} -.01`}
      />;

    progressBarTotal = 
      <a-cylinder
        radius={progressRadius} 
        height={picRadius * 2}
        rotation='0 0 90'
        color='#b2b2b2'
        opacity='0.2'
        position={`0 ${progressYPos} 0`}
      />;
  }
  //* animation__move={animateScaleMove} */
  return (
    <a-entity position={`${props.x} ${props.y}, ${props.z}`} rotation={`${props.xRotation} ${props.yRotation} ${0}`}>
      <a-cylinder 
        id={`friend${props.friend.profile.id}`} 
        radius={picRadius}
        height='0.15'
        rotation="0 90 90"
        material={`src: ${props.friend.profile.img_url}`}
        animation__scale={`property: scale; dir: alternate; dur: 1800; easing: easeInSine; loop: true; to: .940 .940 .940; delay: ${Math.round(Math.random()*1000) + 1}`}
        animation__float={`property: rotation; dir: alternate; dur: 1800; easing: easeInSine; loop: true; from: 0 78 90; to: 0 102 90; delay: ${Math.round(Math.random()*1000) + 1}`}
        animation__bounce='property: scale; dir: alternate; dur: 150; easing: easeInSine; repeat: 1; to: 1.1 1.1 1.1; startEvents: click, nextplay'
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
      {storiesFraction}
      {progressBarTotal}
    </a-entity>
  );
};

export default VRProfile;
