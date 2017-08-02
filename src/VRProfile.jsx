import React from 'react';

class VRProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateWhen = this.props.animations;
    let animatefriend = this[`animatefriend${this.props.friend.id}`];

    if (this.props.enableAnimation) {
      this.props.addToAnimationRefs(animatefriend);

      animatefriend.setAttribute('rotation', '0 -18 0');
      animatefriend.setAttribute('animation__bounce', animateWhen('trigger', 'bounceTo', '1.1 1.1 1.1'));
      animatefriend.setAttribute('animation__shrinking', animateWhen('always', 'shrinkingTo', '.92 .92 .92'));
      animatefriend.setAttribute('animation__turning', animateWhen('always', 'turningTo', '18'));
    }
  }

  render() {
    let circleFraction, circleProgress;
    let picRadius = 1;

    if (this.props.currentStory.id === this.props.friend.id) {
      let length = this.props.currentStories.length;
      let total = this.props.currentStoriesDuration.total;
      let current = this.props.currentStoriesDuration.current;

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
      circleProgress = setProgress(this.props.currentStory.index, '#4286f4');
    }

    return (
      <a-entity position={`${this.props.x} ${this.props.y}, ${this.props.z}`} rotation={`${this.props.xRotation} ${this.props.yRotation} ${0}`}>
        <a-entity
          rotation='0 0 0'
          id={`animatefriend${this.props.friend.id}`}
          ref={el => this[`animatefriend${this.props.friend.id}`] = el}
        >
          <a-cylinder
            //NEED TO ASK IF LINE BELOW CAN BE REMOVED
            id={`friend${this.props.friend.id}`}
            radius={picRadius}
            height='0.15'
            rotation="0 90 90"
            material={`src: #profile${this.props.friend.id}; npot:true`}
            onClick={() => this.props.onFriendClick(this.props.friend)}
          />
          <a-text 
            value={this.props.friend.displayName} 
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
  }
};

export default VRProfile;
