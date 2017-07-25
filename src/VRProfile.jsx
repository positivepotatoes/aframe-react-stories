import React from 'react';
import 'aframe';
import 'aframe-animation-component';
import { Entity } from 'aframe-react';

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
      <Entity 
        geometry={{primitive: 'cylinder', radius: progressRadius, height: progress}}
        rotation='0 0 90'
        material={{color: '#89b6ff', opacity: .8}}
        position={{y: progressYPos, x: progressXPos}}
      />;
    progressBarTotal = 
      <Entity 
        geometry={{primitive: 'cylinder', radius: progressRadius, height: picRadius * 2}}
        rotation='0 0 90'
        material={{color: '#b2b2b2', opacity: .3}}
        position={{y: progressYPos}}
      />;
  }



  return (
    <Entity position={{x: props.x, y: props.y, z: props.z}} rotation={{x: props.xRotation, y: props.yRotation, z: 0}}>
      <Entity id='cylinder'
        geometry={{primitive: 'cylinder', radius: picRadius, height: 0.15}}
        rotation="0 90 90"
        material={{src: props.friend.profile.img_url}}
        // animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
        animation__scale={animateScaleClick}
        // animation__yoyo={{property: 'position', dir: 'alternate', dur: 1000, easing: 'easeInSine', loop: true, to: '0 2 0'}}
        events={{click: (() => props.onFriendClick(props.friend)), mouseenter: props.toggleInEntity, mouseleave: props.toggleInEntity}}
      />
      <Entity 
        text={{value: props.friend.profile.first, align: 'center', color: 'white', width: 6}} 
        position={{y: - picRadius * 1.2}}
        animation__move={animateScaleMove}
      />
      {progressBar}
      {progressBarTotal}
    </Entity>
  );
};

export default VRProfile;
