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
      autoPlayNext: props.autoPlayNext || false,
      autoPlayStart: props.autoPlayStart || false,
      defaultDuration: props.defaultDuration || 7000,
      exitCallback: props.exitCallback,
      assetsCallback: props.assetsCallback || (() => console.log('This module will not work without an assetsCallback. Please provide a callback to receive a list of generated assetes for all your media')),
      viewCountCallback: props.viewCountCallback || (() => console.log('viewCallback was not provided as a prop to VRStories')),
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
      animationRefs: ['exit', 'exitbutton', 'exittext1', 'exittext2', 'next', 'nextbutton', 'nexttext']
      // USE FOR MOCK DATA
      // friends: mockData.friends,
      // user: mockData.user,
    };
    this.playNext = this.playNext.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
    this.setSplashScreen = this.setSplashScreen.bind(this);
  }

  componentWillMount() {
    this.setId(this.state.friends);
    this.setId([this.state.user], true);
    this.createAssets();
    this.setAutoPlayOrSplash();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentStory.index !== this.state.currentStory.index && this.state.currentStory.storyDBId !== undefined && this.state.currentStory.uploadId !== this.state.user.profile.uploadId) {
      this.props.viewCountCallback(this.state.currentStory.storyDBId)
    }
    if (this.state.currentStory.uploadId === this.state.user.profile.uploadId) {
      this.props.ownStoryViewsCallback(this.state.currentStory.storyDBId);
    }
  }

  // SINCE USER OF THIS MODULE WILL ONLY PROVIDE LIST OF FRIENDS AND NOT ANY KEYS
  // WE BUILT THIS HELPER FUNCTION TO IDENTIFY EVERY VIDEO TO EACH FRIEND
  setId(data, isUser = false) {
    data.forEach((user, i) => {
      if (isUser) { i = -1; }
      user.profile.id = i;
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
      this.state.animationRefs.forEach(ref => document.getElementById(ref).emit('finishplay'));
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
    } else {
      storyDom.play()
        .then(() => {
          initTimeoutAndProgress(storyDom.duration * 1000);
        });
    }
    this.state.animationRefs.forEach(ref => document.getElementById(ref).emit('initializeplay'));
  }

  playNext() {
    const { friends, autoPlayNext, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextFriendIndex = currentStory.id + 1;
    let nextFriend = friends[nextFriendIndex];
    let nextStoryIndex = currentStory.index + 1;
    let reachedLastStory = nextStoryIndex === currentStories.length;

    if (currentStory.index === -2) {
      this.onFriendClick(this.state.friends[0]);
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
        } else {
          nextFriendIndex++;
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
    } else if (friendData.profile.id === currentStory.id) {
      if ((currentStory.index + 1) === currentStories.length) {
        this.setSplashScreen();
      } else {
        this.playNext();
      }
    } else {
      this.setState({
        lastClickedFriendIndex: friendData.profile.id,
        currentStories: friendData.stories,
        currentStory: friendData.stories[0],
        currentStoriesDuration: {}
      }, () => this.invokePlay());
    }
  }

  setAutoPlayOrSplash() {
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0]);
    } else {
      this.setSplashScreen();
    }
  }

  createAssets() {
    let splashScreenAsset = (<img id='-2,-2' key='-2' src={this.props.splashScreen} crossOrigin='anonymous'/>);
    let allStories = [];
    this.state.profiles.forEach(friend => {
      friend.stories.forEach(story => {
        allStories.push(story);
      });
    });

    let assets = allStories.map((story, i) => {
      let id = story.id + ',' + story.index;
      if (story.type.slice(0, 5) === 'image') {
        return (
          <img id={id} key={i} src={story.src} crossOrigin='anonymous'/>
        );
      } else {
        return (
          <video id={id} key={i} src={story.src} crossOrigin='anonymous'/>
        );
      }
    });
    assets.push(splashScreenAsset);

    this.state.assetsCallback(assets);
  }

  render () {
    const { currentStory, currentStories, friends, user, splashScreen, profiles, currentStoriesDuration, exitCallback } = this.state;

    let exitButton;
    if (exitCallback) {
      exitButton = <VRExit exitCallback={exitCallback} setSplashScreen={this.setSplashScreen} currentStory={currentStory}/>
    }

    return (
      <a-entity>
        <VRProfiles
          friends={profiles}
          currentStory={currentStory}
          currentStories={currentStories}
          onFriendClick={this.onFriendClick}
          currentStoriesDuration={currentStoriesDuration}
        />

        <VRPrimitive currentStory={currentStory}/>
        <VRNext playNext={this.playNext}/>
        {exitButton}
      </a-entity>
    );
  }
}

export default VRStories;
