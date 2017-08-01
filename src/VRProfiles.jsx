import React from 'react';
import Profile from './VRProfile.jsx';

class VRProfiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let n = this.props.friends.length;
    let start = (n) * Math.PI / 12;
    let theta = (Math.PI - start) / 2;
    let x, z, yRotation;
    let radius = 10;
    let showFriendsRadius = radius - 0.1;
    let y = -4;
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
                currentStoriesDuration={this.props.currentStoriesDuration}
              />
            );
          })
        }
        <a-cylinder
          geometry="width: 2; height: 0.15; depth: 0.15"
          material="color: white; opacity: 0.5"
          position={`${(-Math.cos(theta) * radius)} ${y} ${(-Math.sin(theta) * radius)}`}
          rotation={`${90 + (Math.atan(Math.abs(y) / radius) * 180 / Math.PI)} ${180 + ((Math.PI / 2) - theta) * 180 / Math.PI} 0`}
          onClick={this.props.onShowMoreFriendsClick}
        />
        <a-text
          value='show\nmore\nfriends'
          align='center'
          material='color: white'
          width='10'
          position={`${-Math.cos(theta) * showFriendsRadius} ${y} ${-Math.sin(theta) * showFriendsRadius}`}
          rotation={`${-Math.atan(Math.abs(y) / showFriendsRadius) * 180 / Math.PI} ${((Math.PI / 2) - theta) * 180 / Math.PI} 0`}
        />
      </a-entity>
    );
  }
}

export default VRProfiles;
