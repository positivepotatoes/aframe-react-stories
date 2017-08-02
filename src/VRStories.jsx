import React from 'react';
import VRProfiles from './VRProfiles.jsx';
import VRPrimitive from './VRPrimitive.jsx';
import VRNext from './VRNext.jsx';
import VRExit from './VRExit.jsx';


class VRStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {},
      friends: props.friends || [],
      profiles: [props.user].concat(props.friends),
      displayNumFriends: props.displayNumFriends || 5,
      friendsShowingIndex: { start: 0, end: props.displayNumFriends || 5 },
      autoPlayNext: props.autoPlayNext || false,
      autoPlayStart: props.autoPlayStart || false,
      defaultDuration: props.defaultDuration || 7000,
      exitCallback: props.exitCallback,
      enableAnimation: props.enableAnimation || false,
      assetsCallback: props.assetsCallback || (() => console.log('This module will not work without an assetsCallback. Please provide a callback to receive a list of generated assets for all your media')),
      viewCallback: props.viewCallback || (() => console.log('viewCallback was not provided as a prop to VRStories')),
      splashScreen: {
        id: -2,
        index: -2,
        type: 'image',
        src: props.splashScreen,
      },

      currentStory: {
        id: -2,
        index: -2,
        type: 'image',
        src: props.splashScreen,
      },
      currentStories: [],
      storyInTimeout: null,
      durationInTimeout: null,
      currentStoriesDuration: {},
      lastClickedFriendIndex: null,
      animationRefs: [],
      // USE FOR MOCK DATA
      // friends: mockData.friends,
      // user: mockData.user,
    };
    this.playNext = this.playNext.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
    this.setSplashScreen = this.setSplashScreen.bind(this);
    this.animations = this.animations.bind(this);
    this.onShowMoreFriendsClick = this.onShowMoreFriendsClick.bind(this);
    this.addToAnimationRefs = this.addToAnimationRefs.bind(this);
  }

  componentWillMount() {
    this.setId(this.state.friends);
    this.setId([this.state.user], true);
    this.createAssets();
    this.setAutoPlayOrSplash();
    // this.setExitRefs();
  }

  // setExitRefs() {
  //   if (this.state.exitCallback) {
  //     this.setState({
  //       animationRefs: this.state.animationRefs.concat(['exit', 'exitbutton', 'exittext1', 'exittext2'])
  //     });
  //   }
  // }

  // SINCE USER OF THIS MODULE WILL ONLY PROVIDE LIST OF FRIENDS AND NOT ANY KEYS
  // WE BUILT THIS HELPER FUNCTION TO IDENTIFY EVERY VIDEO TO EACH FRIEND
  setId(data, isUser = false) {
    data.forEach((user, i) => {
      if (isUser) { i = -1; }
      user.id = i;
      user.stories.forEach((story, j) => {
        story.id = i;
        story.index = j;
      });
    });
  }

  pauseStories() {
    let stories = Array.prototype.slice.call(document.getElementsByTagName('video'));
    stories.forEach(story => {
      story.pause();
      story.currentTime = 0;
    });
    clearTimeout(this.state.storyInTimeout);
    clearInterval(this.state.durationInTimeout);
  }

  setDurationCounter() {
    let story = this.state.currentStory;
    let storyDom = document.getElementById(story.id + ',' + story.index);
    let totalDuration = storyDom.duration || this.state.defaultDuration / 1000;
    // let totalDuration = this.state.defaultDuration / 1000;

    this.setState({
      currentStoriesDuration: {
        current: 0,
        total: totalDuration
      }
    });

    this.state.durationInTimeout = setInterval(() => {
      this.setState({
        currentStoriesDuration: {
          current: storyDom.currentTime || this.state.currentStoriesDuration.current + .01,
          total: this.state.currentStoriesDuration.total
        }
      });
    }, 10);
  }

  setSplashScreen() {
    this.pauseStories();
    this.setState({
      currentStory: this.state.splashScreen
    }, () => {
      this.state.animationRefs.forEach(ref => ref.emit('stopping'));
      this.props.viewCallback(this.state.currentStory);
    });
  }

  // THIS NEEDS TO BE INVOKED EVERYTIME THE STATE OF THE CURRENT STORY IS CHANGED
  invokePlay() {
    let storyDom = document.getElementById(this.state.currentStory.id + ',' + this.state.currentStory.index);
    const initTimeoutAndProgress = (duration) => {
      this.state.storyInTimeout = setTimeout(() => this.playNext(), duration);
      this.setDurationCounter();
    };

    this.pauseStories();
    if (this.state.currentStory.type.slice(0, 5) === 'image') {
      initTimeoutAndProgress(this.state.defaultDuration);
      this.state.viewCallback(this.state.currentStory);
    } else {
      storyDom.play()
        .then(() => {
          initTimeoutAndProgress(storyDom.duration * 1000);
          // put viewCallback here
          this.props.viewCallback(this.state.currentStory);
        });
    }
    this.state.animationRefs.forEach(ref => {
      console.log(ref);
      ref.emit('playing');
    });

    // if (document.getElementById(`animatefriend${this.state.currentStory.id}`)) {
    //   document.getElementById(`animatefriend${this.state.currentStory.id}`).emit('trigger');
    // }
  }

  playNext() {
    const { friends, autoPlayNext, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextFriendIndex = currentStory.id + 1;
    let nextFriend = friends[nextFriendIndex];
    let nextStoryIndex = currentStory.index + 1;
    let reachedLastStory = nextStoryIndex === currentStories.length;

    if (currentStory.index === -2) {
      this.onFriendClick(this.state.friends[this.state.friendsShowingIndex.start]);
      return;
    }

    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: currentStories[nextStoryIndex],
        currentStoriesDuration: {}
      }, () => this.invokePlay());
    }

    if (autoPlayNext && reachedLastStory) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i || lastClickedFriendIndex === -1) {
          this.setSplashScreen();
        } else {
          this.setState({
            currentStories: friends[i].stories,
            currentStory: friends[i].stories[0],
            currentStoriesDuration: {}
          }, () => this.invokePlay());
        }
      };

      while (nextFriend && nextFriend.stories.length === 0) {
        if (nextFriendIndex + 1 === friends.length) {
          nextFriendIndex = 0;
          nextFriend = friends[nextFriendIndex];
        } else {
          nextFriendIndex++;
          nextFriend = friends[nextFriendIndex];
        }
      }

      if (nextFriendIndex < friends.length) {
        nextstate(nextFriendIndex);
      } else {
        nextstate(0);
      }
    } else if (!autoPlayNext && reachedLastStory) {
      this.setSplashScreen();
    }
  }

  onFriendClick(friendData) {
    const { currentStory, currentStories, splashScreen } = this.state;

    if (friendData.stories.length === 0) {
      this.setSplashScreen();
    } else if (friendData.id === currentStory.id) {
      if ((currentStory.index + 1) === currentStories.length) {
        this.setSplashScreen();
      } else {
        this.playNext();
      }
    } else {
      this.setState({
        lastClickedFriendIndex: friendData.id,
        currentStories: friendData.stories,
        currentStory: friendData.stories[0],
        currentStoriesDuration: {}
      }, () => this.invokePlay());
    }
  }

  onShowMoreFriendsClick() {
    if (this.state.friendsShowingIndex.end >= this.state.friends.length) {
      this.setState({
        friendsShowingIndex: { start: 0, end: this.state.displayNumFriends }
      });
    } else {
      this.setState({
        friendsShowingIndex: { start: this.state.friendsShowingIndex.end, end: this.state.friendsShowingIndex.end + this.state.displayNumFriends }
      });
    }
  }

  setAutoPlayOrSplash() {
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0]);
    } else {
      this.setSplashScreen();
    }
  }
  //
  createAssets() {
    let splashScreenAsset = (<img id='-2,-2' key='-2' src={this.props.splashScreen} crossOrigin='anonymous' />);
    let allStories = [];
    let allPics = [];
    this.state.profiles.forEach((profile, profileIndex) => {
      let idenifier = 'profile' + (profileIndex - 1).toString();
      allPics.push(
        <img id={idenifier} key={idenifier} src={profile.img_url} crossOrigin='anonymous' />
      );

      profile.stories.forEach(story => {
        allStories.push(story);
      });
    });

    let assets = allStories.map((story, i) => {
      let id = story.id + ',' + story.index;
      if (story.type.slice(0, 5) === 'image') {
        return (
          <img id={id} key={i} src={story.src} crossOrigin='anonymous' />
        );
      } else {
        return (
          <video id={id} key={i} src={story.src} crossOrigin='anonymous' />
        );
      }
    });

    assets.push(splashScreenAsset);
    assets = assets.concat(allPics);
    this.state.assetsCallback(assets);
  }

  animations(status, animation, to) {
    let animations = {
      scaleTo: `property: scale; dur: 450; easing: easeInSine; to: ${to}; startEvents: ${status}`,
      moveTo: `property: position; dur: 450; easing: easeInSine; to: ${to}; startEvents: ${status}`,
      fadeTextTo: `property: opacity; dur: 1400; easing: easeInSine; to: ${to}; startEvents: ${status}`,
      bounceTo: `property: scale; dur: 150; easing: easeInSine; to: ${to}; startEvents: ${status}; dir: alternate`,
      fadingTo: `property: color; dur: 1100; easing: easeInSine; to: ${to}; dir: alternate; loop: true`,
      tiltingTo: `property: rotation; dur: 1100; easing: easeInSine; from: 0 0 -${to}; to: 0 0 ${to}; dir: alternate; loop: true`,
      shrinkingTo: `property: scale; dur: 1100; easing: easeInSine; to: ${to}; dir: alternate; loop: true; delay: ${Math.round(Math.random() * 2000)}`,
      turningTo: `property: rotation; dur: 1100; easing: easeInSine; to: 0 ${to} 0; dir: alternate; loop: true; delay: ${Math.round(Math.random() * 2000)}`
    };
    return animations[animation];
  }

  addToAnimationRefs(ref) {
    this.state.animationRefs.push(ref)
  }

  render() {
    const { currentStory, currentStories, currentStoriesDuration, exitCallback, enableAnimation, animationRefs } = this.state;
    const showProfiles = [this.state.user].concat((this.state.friends).slice(this.state.friendsShowingIndex.start, this.state.friendsShowingIndex.end));
    let exitButton;
    if (exitCallback) {
      exitButton = <VRExit exitCallback={exitCallback} currentStory={currentStory} setSplashScreen={this.setSplashScreen} animations={this.animations} enableAnimation={enableAnimation} addToAnimationRefs={this.addToAnimationRefs}/>
    }
    return (
      <a-entity>
        <VRProfiles
          friends={showProfiles}
          currentStory={currentStory}
          animations={this.animations}
          currentStories={currentStories}
          enableAnimation={enableAnimation}
          onFriendClick={this.onFriendClick}
          addToAnimationRefs={this.addToAnimationRefs}
          currentStoriesDuration={currentStoriesDuration}
          onShowMoreFriendsClick={this.onShowMoreFriendsClick}
        />;

        <VRPrimitive currentStory={currentStory} />
        <VRNext playNext={this.playNext} animations={this.animations} currentStory={currentStory} enableAnimation={enableAnimation} providedExitCallback={exitCallback} animationRefs={animationRefs} addToAnimationRefs={this.addToAnimationRefs}/>
        {exitButton}
      </a-entity>
    );
  }
}

export default VRStories;
