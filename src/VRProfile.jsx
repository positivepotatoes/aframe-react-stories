import React from 'react';

const VRProfile = (props) => {
  const animateWhen = props.animations;
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
        id={`animatefriend${props.friend.profile.id}`}
        rotation='0 -18 0'
        animation__bounce={animateWhen('trigger', 'bounceTo', '1.1 1.1 1.1')}
        animation__shrinking={animateWhen('always', 'shrinkingTo', '.92 .92 .92')}
        animation__turning={animateWhen('always', 'turningTo', '18')}
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
