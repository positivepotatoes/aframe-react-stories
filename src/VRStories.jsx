import React from 'react';
import ReactDOM from 'react-dom';
import VRProfiles from './VRProfiles.jsx';
import VRPrimitive from './VRPrimitive.jsx';
import VRExit from './VRExit.jsx';

class VRStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {},
      friends: props.friends || [],
      autoPlayNext: props.autoPlayNext || false,
      autoPlayStart: props.autoPlayStart || false,
      defaultDuration: props.defaultDuration || 7000,
      assetsCallback: props.assetsCallback || (() => console.log('This module will not work without an assetsCallback. Please provide a callback to receive a list of generated assetes for all your media')),
      splashScreen: {
        id: -2,
        index: -2,
        type: 'image',
        src: props.splashScreen,
      },

      currentStory: {},
      currentStories: [],
      storyInTimeout: null,
      durationInTimeout: null,
      currentStoriesDuration: {
        current: 0,
        storyBegining: 0,
        total: 0
      },
      lastClickedFriendIndex: null,
      // USE FOR MOCK DATA
      // friends: mockData.friends,
      // user: mockData.user,
    };
    this.playNext = this.playNext.bind(this);
    this.onFriendClick = this.onFriendClick.bind(this);
  }

  componentWillMount() {
    this.removeFriendsWithNoStories();
    this.setId(this.state.friends);
    this.setId([this.state.user], true);
    this.setAutoPlayOrSplash();
    this.createAssets();
  }

  removeFriendsWithNoStories() {
    this.setState({
      friends: this.state.friends.filter(friend => friend.stories.length > 1)
    });
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentStory.index !== this.state.currentStory.index) {
      console.log('story changed!');
      if (this.state.currentStory.type === 'image/jpeg') {
        setTimeout(() => this.props.viewCountCallback(this.state.currentStory.storyDBId), 5000);
      } else if (this.state.currentStory.type === 'video/mp4') {
        setTimeout(() => this.props.viewCountCallback(this.state.currentStory.storyDBId), 10000);
      }
    }
  }


  countStoriesDuration() {
    let that = this;
    this.state.durationInTimeout = setInterval(() => {
      // console.log('setting interval', this.state.currentStoriesDuration.current + .1)
      that.setState({
        currentStoriesDuration: {
          current: that.state.currentStoriesDuration.current + .1,
          storyBegining: that.state.currentStoriesDuration.storyBegining,
          total: that.state.currentStoriesDuration.total
        }
      });
    }, 100);
  }

  setInitialStoriesDuration() {
    const getDuration = (n) => {
      let totalDuration = 0;
      for (let i = 0; i < n; i++) {
        let storyObject = this.state.currentStories[i];
        let storyDom = document.getElementById(storyObject.id + ',' + storyObject.index);

        if (storyObject.type.slice(0, 5) === 'image' ) {
          totalDuration += this.state.defaultDuration / 1000;
        } else {
          totalDuration += storyDom.duration;
        }
      }
      return totalDuration;
    };

    this.setState({
      currentStoriesDuration: {
        current: getDuration(this.state.currentStory.index),
        storyBegining: getDuration(this.state.currentStory.index),
        total: getDuration(this.state.currentStories.length)
      }
    });

    this.countStoriesDuration();
  }

  pauseStories() {
    let stories = Array.prototype.slice.call(document.getElementsByTagName('video'));
    stories.forEach(story => story.pause());
    clearTimeout(this.state.storyInTimeout);
    clearInterval(this.state.durationInTimeout);
  }

  setSplashScreen() {
    this.pauseStories();
    this.setState({
      currentStory: this.state.splashScreen
    });
  }

  setAutoPlayOrSplash() {
    if (this.state.autoPlayStart) {
      this.onFriendClick(this.state.friends[0]);
    } else {
      this.setSplashScreen();
    }
  }

  // THIS NEEDS TO BE INVOKED EVERYTIME THE STATE OF THE CURRENT STORY IS CHANGED
  invokePlay() {
    if (this.state.currentStories.length === 0) {
      this.playNext();
    }

    let that = this;
    let storyDom = document.getElementById(this.state.currentStory.id + ',' + this.state.currentStory.index);
    const setStoryTimeout = (duration) => {
      this.state.storyInTimeout = setTimeout(function() {
        that.playNext();
      }, duration);
    };

    this.pauseStories();

    if (this.state.currentStory.type.slice(0, 5) === 'image') {
      setStoryTimeout(this.state.defaultDuration);
    } else {
      storyDom.currentTime = 0;
      storyDom.play();
      setStoryTimeout(storyDom.duration * 1000);
    }

    this.setInitialStoriesDuration();
  }

  // THIS FUNCTION WILL UPDATE currentStory TO BE THE NEXT STORY
  playNextStoryOfFriend() {
    const { currentStories, currentStory } = this.state;
    let nextStoryIndex = currentStory.index + 1;

    if (nextStoryIndex < currentStories.length) {
      this.setState({
        currentStory: currentStories[nextStoryIndex]
      }, () => this.invokePlay());
    }
  }

  // THIS FUNCTION WILL PLAY THE NEXT STORY OF currentStories AND IF AUTOPLAY IS ON, THE NEXT FRIEND'S STORIES WILL BE PLAYED
  playNext() {
    const { friends, autoPlayNext, currentStories, currentStory, lastClickedFriendIndex } = this.state;
    let nextStoryIndex = currentStory.index + 1;
    let nextFriendIndex = currentStory.id + 1;
    let reachedLastStory = nextStoryIndex === currentStories.length;
    this.playNextStoryOfFriend();

    if (autoPlayNext && reachedLastStory) {
      let nextstate = (i) => {
        if (lastClickedFriendIndex === i) {
          this.setSplashScreen();
        } else {
          this.setState({
            currentStories: friends[i].stories,
            currentStory: friends[i].stories[0]
          }, () => this.invokePlay());
        }
      };

      if (nextFriendIndex < friends.length) {
        nextstate(nextFriendIndex);
      } else {
        nextstate(0);
      }
    } else if (!autoPlayNext && reachedLastStory) {
      this.setSplashScreen();
    }
  }

  // THIS FUNCTION WILL UPDATE THE STATE OF THE MOST RECENTLY CLICKED FRIEND
  //
  // THIS IS ALSO NECESSARY TO KNOW WHICH FRIEND WAS LAST CLICKED TO KNOW WHEN TO END STORIES LOOP
  // AND TO MAKE THIS FRIEND THE CURRENT STORIES SHOWING
  onFriendClick(friendData) {
    const { currentStory, currentStories, splashScreen } = this.state;

    if (friendData.profile.id === currentStory.id) {
      if ((currentStory.index + 1) === currentStories.length) {
        this.setSplashScreen();
      } else {
        this.playNext();
      }
    } else {
      this.setState({
        lastClickedFriendIndex: friendData.profile.id,
        currentStories: friendData.stories,
        currentStory: friendData.stories[0]
      }, () => this.invokePlay());
    }
  }

  createAssets() {
    let allStories = [];
    this.state.friends.forEach(friend => {
      friend.stories.forEach(story => {
        allStories.push(story);
      });
    });
    let splashScreenAsset = (<img id='-2,-2' key='-2' src={this.props.splashScreen} crossOrigin='anonymous'/>);

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
    const { currentStory, friends, user, splashScreen, currentStoriesDuration } = this.state;

    return (
      <a-entity>
        <VRProfiles
          friends={friends}
          currentStory={currentStory}
          onFriendClick={this.onFriendClick}
          currentStoriesDuration={currentStoriesDuration}
        />

        <VRPrimitive currentStory={currentStory}/>
        <VRExit exitCallback={this.props.exitCallback}/>
      </a-entity>
    );
  }
}

export default VRStories;
