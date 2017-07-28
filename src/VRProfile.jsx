import React from 'react';

const VRProfile = props => {
  let circleFraction, circleProgress, circlePrevProgress;
  let picRadius = 1;
  let spacing = 0.2;

  if (props.currentStory.id === props.friend.profile.id) {
    const getProgress = (i, total, radius) => {
      return i / total * radius * 2;      
    };

    const getXPosition = (i, total, radius) => {
      return -radius + (radius * i / total);
    }

    let progressRadius = .1;
    let progressYPos = -picRadius * 1.45;

    let current = props.currentStoriesDuration.current;
    let total = props.currentStoriesDuration.total;

    let storyFraction = props.currentStory.index + 1;
    let storyFractionTotal = props.currentStories.length;
    




    const getArcProgress = (i, total, arcMax) => {
      if (i / total * arcMax > .001) {
        return i / total * arcMax;
      } else {
        return .001;
      }
    };
    
    const setLoading = () => {
      let segmentLength = 360 / props.currentStories.length;
      segmentLength -= 3.5;
      let rotate = 360 / props.currentStories.length;
      let startingRotation = 90

      let loaders = [];

      for (var i = 0; i < props.currentStories.length; i++) {
        loaders.push( 
          <a-torus
            key={i}
            radius='1'
            opacity='0.7'
            color='#b2b2b2'
            radius-tubular='.15'
            arc={segmentLength}
            rotation={`0 180 ${startingRotation}`}
          />
        )
        startingRotation += rotate
      }
      return loaders;
    }
    circleFraction = setLoading();




    const setProgress = (n) => {
      let segmentLength = 360 / props.currentStories.length;
      segmentLength -= 3.5;
      let rotate = 360 / props.currentStories.length;
      let startingRotation = 90

      let loaders = [];

      for (var i = 0; i <= n; i++) {
        

        if (i === n) {
          segmentLength = getArcProgress(current, total, segmentLength)
        }

        loaders.push(
          <a-torus
            key={i}
            radius='1'
            opacity='0.7'
            color='#54d1ff'
            radius-tubular='.15'
            arc={segmentLength}
            rotation={`0 180 ${startingRotation}`}
          />
        )
        startingRotation += rotate
      }
      return loaders;
    }

    circleProgress = setProgress(props.currentStory.index);

    // circleFraction =
    //   <a-torus
    //     radius='1'
    //     opacity='0.7'
    //     color='#b2b2b2'
    //     rotation='0 180 90'
    //     radius-tubular='.09'

    //     arc={getArcProgress(storyFraction, storyFractionTotal)}
    //   />;

    // circleProgress =
      // <a-torus
      //   radius='1'
      //   opacity='0.7'
      //   color='#54d1ff'
      //   rotation='0 180 90'
      //   radius-tubular='.09'
      //   arc={getArcProgress(props.currentStoriesDuration.current, total)}
      // />;
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
