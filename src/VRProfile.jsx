import React from 'react';

const VRProfile = props => {
  let circleFraction, circleProgress;
  let picRadius = 1;
  let spacing = 0.2;

  if (props.currentStory.id === props.friend.profile.id) {
    let length = props.currentStories.length;
    let total = props.currentStoriesDuration.total;
    let current = props.currentStoriesDuration.current;

    const getArcProgress = (i, total, arcMax) => {
      if (i / total * arcMax > .001) {
        return i / total * arcMax;
      } else {
        return .001;
      }
    };

    const setProgress = (n, color, settingProgress=true) => {
      let segmentLength = 360 / length - 3.5;
      let rotate = 360 / length;
      let rotation = 90;
      let segments = [];
      let upTo = n;
      if (!settingProgress) {
        upTo = n - 1;
      }

      for (var i = 0; i <= upTo; i++) {
        if (i === n && settingProgress) {
          segmentLength = getArcProgress(current, total, segmentLength)
        }
        segments.push(
          <a-torus
            key={i}
            radius='1.1'
            opacity='.7'
            color={color}
            radius-tubular='.03'
            arc={segmentLength}
            rotation={`0 180 ${rotation}`}
          />
        )
        rotation += rotate
      }
      return segments;
    }
    circleFraction = setProgress(length, '#b2b2b2', false);
    circleProgress = setProgress(props.currentStory.index, '#4286f4');
  }

  return (
    <a-entity position={`${props.x} ${props.y}, ${props.z}`} rotation={`${props.xRotation} ${props.yRotation} ${0}`}>
      <a-entity 
        animation__bounce={`property: scale; dir: alternate; dur: 150; easing: easeInSine; repeat: 1; to: 1.1 1.1 1.1; startEvents: click, nextplay`}
        animation__scale={`property: scale; dir: alternate; dur: 1800; easing: easeInSine; loop: true; to: .920 .920 .920; delay: ${Math.round(Math.random()*1000) * props.friend.profile.id + 1}`}
        animation__float={`property: rotation; dir: alternate; dur: 1800; easing: easeInSine; loop: true; from: 0 -13 0; to: 0 13 0; delay: ${Math.round(Math.random()*1000) * props.friend.profile.id + 1}`}
        // animation__float={`property: position; dir: alternate; dur: 1000; easing: easeInSine; loop: true; from: 0 0 .5; to: 0 0 -.5; delay: ${props.key * 1200}`}
      >
        <a-cylinder 
          id={`friend${props.friend.profile.id}`} 
          radius={picRadius}
          height='0.15'
          rotation="0 90 90"
          material={`src: #profile${props.friend.profile.id}`}
          onClick={() => props.onFriendClick(props.friend)}
        />
        <a-text 
          value={props.friend.profile.first} 
          align='center' 
          color='white'
          width='6'
          position={`0 ${-picRadius * 1.25} 0`}
        />
        {circleFraction}
        {circleProgress}
      </a-entity>
    </a-entity>
  );
};

export default VRProfile;
