import React from 'react';

const VRProfile = props => {
  let circleFraction, circleProgress;
  let picRadius = 1;
  let spacing = 0.2;

  if (props.currentStory.id === props.friend.profile.id) {

    let current = props.currentStoriesDuration.current;
    let total = props.currentStoriesDuration.total;
    let length = props.currentStories.length;
    

    const getArcProgress = (i, total, arcMax) => {
      if (i / total * arcMax > .001) {
        return i / total * arcMax;
      } else {
        return .001;
      }
    };
    
    const setLoading = (n) => {
      let segmentLength = 360 / length - 3.5;
      let rotate = 360 / length;
      let startingRotation = 90
      let loaders = [];

      for (var i = 0; i <= n - 1; i++) {
        loaders.push( 
          <a-torus
            key={i}
            radius='1.1'
            opacity='0.7'
            color='#b2b2b2'
            radius-tubular='.03'
            arc={segmentLength}
            rotation={`0 180 ${startingRotation}`}
          />
        )
        startingRotation += rotate
      }
      return loaders;
    }
    circleFraction = setLoading(length);


    const setProgress = (n) => {
      let segmentLength = 360 / length - 3.5;
      let rotate = 360 / length;
      let startingRotation = 90
      let loaders = [];

      for (var i = 0; i <= n; i++) {
        if (i === n) {
          segmentLength = getArcProgress(current, total, segmentLength)
        }

        loaders.push(
          <a-torus
            key={i}
            radius='1.1'
            opacity='1'
            color='#4286f4'
            radius-tubular='.03'
            arc={segmentLength}
            rotation={`0 180 ${startingRotation}`}
          />
        )
        startingRotation += rotate
      }

      return loaders;
    }

    circleProgress = setProgress(props.currentStory.index);


  }
  
  return (
    <a-entity position={`${props.x} ${props.y}, ${props.z}`} rotation={`${props.xRotation} ${props.yRotation} ${0}`}>
      <a-cylinder 
        id={`friend${props.friend.profile.id}`} 
        radius={picRadius}
        height='0.15'
        rotation="0 90 90"
        material={`src: ${props.friend.profile.img_url}`}
        // animation__scale={`property: scale; dir: alternate; dur: 1800; easing: easeInSine; loop: true; to: .940 .940 .940; delay: ${Math.round(Math.random()*1000) + 1}`}
        // animation__float={`property: rotation; dir: alternate; dur: 1800; easing: easeInSine; loop: true; from: 0 78 90; to: 0 102 90; delay: ${Math.round(Math.random()*1000) + 1}`}
        animation__bounce={`property: scale; dir: alternate; dur: 150; easing: easeInSine; repeat: 1; to: 1.1 1.1 1.1; startEvents: click, nextplay`}
        onClick={() => props.onFriendClick(props.friend)}
      />
      
      <a-text 
        value={props.friend.profile.first} 
        align='center' 
        color='white'
        width='6'
        position={`0 ${-picRadius * 1.2} 0`}
        
      />

      
      {circleFraction}
      {circleProgress}
      
    </a-entity>
  );
};

export default VRProfile;
