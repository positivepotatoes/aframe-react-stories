import React from 'react';
import Profile from './Profile.jsx';

class Profiles extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.enableAnimation) {
      const animateWhen = this.props.animations;
      let animateButton = this.moreFriendsButton;
      this.props.addToAnimationRefs(animateButton);
      animateButton.setAttribute('rotation', '0 0 -18');
      animateButton.setAttribute('animation__bounce', animateWhen('trigger', 'bounceTo', '1.1 1.1 1.1'));
      animateButton.setAttribute('animation__shrinking', animateWhen('always', 'shrinkingTo', '.92 .92 .92'));
      animateButton.setAttribute('animation__turning', animateWhen('always', 'turningZ', '18'));
    }
  }

  render() {
    let n = this.props.friends.length;
    let start = (n) * Math.PI / 12;
    let theta = (Math.PI - start) / 2;
    let x, z, yRotation;
    let radius = 10;
    let showFriendsRadius = radius - 0.1;
    let y = -4;
    let moreFriendsButton = this.moreFriendsButton;

    return (
      <a-entity>
        {
          this.props.friends.map((friend, i) => {
            x = -Math.cos(theta) * radius;
            z = -Math.sin(theta) * radius;
            let xRotation = -Math.atan(Math.abs(y) / radius) * 180 / Math.PI;
            yRotation = ((Math.PI / 2) - theta) * 180 / Math.PI;
            theta += (Math.PI / 12);
            return (
              <Profile
                i={i}
                x={x}
                y={y}
                z={z}
                key={i}
                xRotation={xRotation}
                yRotation={yRotation}
                radius={radius}
                friend={friend}
                currentStory={this.props.currentStory}
                currentStories={this.props.currentStories}
                onFriendClick={this.props.onFriendClick}
                animations={this.props.animations}
                enableAnimation={this.props.enableAnimation}
                addToAnimationRefs={this.props.addToAnimationRefs}
                currentStoriesDuration={this.props.currentStoriesDuration}
              />
            );
          })
        }
        <a-entity position={`${(-Math.cos(theta) * radius)} ${y} ${(-Math.sin(theta) * radius)}`}
            rotation={`${90 + (Math.atan(Math.abs(y) / radius) * 180 / Math.PI)} ${180 + ((Math.PI / 2) - theta) * 180 / Math.PI} 0`}>
          <a-cylinder
            ref={el => this.moreFriendsButton = el}
            geometry="width: 2; height: 0.15; depth: 0.15"
            material="color: white; opacity: 0.5"
            onClick={this.props.onShowMoreFriendsClick}
          >
            <a-text
              value='More'
              align='center'
              material='color: white'
              width='10'
              position="0 0 0"
              rotation="90 0 180"
            />
          </a-cylinder>
        </a-entity>
      </a-entity>
    );
  }
}

export default Profiles;
