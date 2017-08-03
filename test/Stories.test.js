import React from 'react';
import Stories from '../src/Stories';
import { shallow, mount, render } from 'enzyme';
import mockData from './mockTestData.js';

describe('<VRStories />', () => {
  let wrapper, wrapperAutoPlayStart;

  beforeEach(() => {
    wrapper = shallow(
      <Stories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={false}
        autoPlayStart={false}
        enableAnimation={true}
        splashScreen={'./abc.jpg'}
        assetsCallback={() => { return; }}
        viewCallback={() => { return; }}
      />
    );

    wrapperAutoPlayStart = shallow(
      <Stories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={false}
        autoPlayStart={true}
        splashScreen={'./abc.jpg'}
        assetsCallback={() => { return; } }
      />
    );
  });

  describe('upon initialization', () => {
    it('should have multiple friends in props when friend data is provided', () => {
      expect(wrapper.state().friends.length).toBeGreaterThan(1);
    });

    describe('when autoPlayStart is false', () => {
      it('should show splashScreen', () => {
        expect(wrapper.state().currentStory.id).toBe(-2);
        expect(wrapper.state().currentStory.index).toBe(-2);
      });
    });

    describe('when autoPlayStart is true', () => {
      it('should play first story of friends', () => {
        expect(wrapperAutoPlayStart.instance().state.currentStory.id).toBe(0);
        expect(wrapperAutoPlayStart.instance().state.currentStory.index).toBe(0);
      });
    });

    describe('setting key and index to each story', () => { 
      it('should apply a key and index to each friend\'s story', () => {
        wrapper.instance().state.friends.forEach(friend => {
          friend.stories.forEach(story => {

            expect(story).toHaveProperty('id');
            expect(story).toHaveProperty('index');
          });
        });
      });

      it('should apply key and index to each user\'s story', () => {
        wrapper.instance().state.user.stories.forEach(story => {
          expect(story).toHaveProperty('id');
          expect(story).toHaveProperty('index');
        });
      });
    });
  });

  describe('handling onFriendClick', () => {
    describe('when no story is currently playing', () => {
      describe('when a user with stories is clicked', () => {
        it('should play the user\'s first story', () => {
          wrapper.instance().onFriendClick(wrapper.state().friends[2]);
          expect(wrapper.state().currentStory).toBe(wrapper.state().friends[2].stories[0]);
        });
      });

      describe('when a user with no stories is clicked', () => {
        it('should do nothing and keep the splash screen', () => {
          wrapper.instance().onFriendClick(wrapper.state().friends[5])
          expect(wrapper.state().currentStory.id).toBe(-2);
          expect(wrapper.state().currentStory.index).toBe(-2);
        });
      })
    });

    describe('when a story is currently playing', () => {
      beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[2]));
      describe('clicking on a friend whos story is currently playing', () => {
        beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[2]));
        describe('when next story is available', () => {
          it('should play the next story', () => {
            expect(wrapper.state().currentStory.id).toBe(2);
            expect(wrapper.state().currentStory.index).toBe(1);
          });
        });
        describe('when next story is not available', () => {
          beforeEach(() => {
            wrapper.instance().onFriendClick(wrapper.state().friends[2]);
            wrapper.instance().onFriendClick(wrapper.state().friends[2]);
          });
          it('should go to the splash screen', () => {
            expect(wrapper.state().currentStory.id).toBe(-2);
            expect(wrapper.state().currentStory.index).toBe(-2);
          });
        });
      });

      describe('clicking on another friend whos story isn\'t playing', () => {
        beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[3]));
        it('should play that clicked friend\'s story', () => {
          expect(wrapper.state().currentStory.id).toBe(3);
          expect(wrapper.state().currentStory.index).toBe(0);
        });
      });
    });
  });

  describe('handling playNext', () => {
    describe('when no story is currently playing', () => {
      it('should play the first friend\'s story', () => {
        wrapper.instance().playNext();
        expect(wrapper.state().currentStory.id).toBe(0);
        expect(wrapper.state().currentStory.index).toBe(0);
      });
    });

    describe('when there is a next story available in currentStories', () => {
      beforeEach(() => {
        wrapper.setState({
          currentStories: mockData.friends[0].stories,
          currentStory: mockData.friends[0].stories[0]
        });
        wrapper.instance().playNext();
      });

      it('should play the next user\'s story', () => {
        expect(wrapper.state().currentStory.id).toBe(0);
        expect(wrapper.state().currentStory.index).toBe(1);
      });
    });

    describe('when there isn\'t a next story available in currentStories', () => {
      beforeEach(() => {
        wrapper.setState({
          currentStories: mockData.friends[0].stories,
          currentStory: mockData.friends[0].stories[2]
        });
        wrapper.instance().playNext();
      });

      describe('when autoPlayNext is false', () => {
        it('should go to the splash screen', () => {
          expect(wrapper.state().currentStory.id).toBe(-2);
          expect(wrapper.state().currentStory.index).toBe(-2);
        });
      });

      describe('when autoPlayNext is true', () => {
        beforeEach(() => {
          wrapper.setState({ 
            currentStories: mockData.friends[0].stories,
            currentStory: mockData.friends[0].stories[2],
            autoPlayNext: true 
          });
          wrapper.instance().playNext();
        });

        describe('when next friend has stories', () => {
          it('should play the next friend\'s stories', () => {
            expect(wrapper.state().currentStory.id).toBe(1);
            expect(wrapper.state().currentStory.index).toBe(0);
          });
        });

        describe('when next friend has no stories', () => {
          beforeEach(() => {
            wrapper.setState({ 
              currentStories: mockData.friends[4].stories,
              currentStory: mockData.friends[4].stories[2],
              autoPlayNext: true 
            });
            wrapper.instance().playNext();
          });

          describe('and the following friend has stories', () => {
            it('should skip the previous friend and go to the following friend\'s stories', () => {
              expect(wrapper.state().currentStory.id).toBe(6);
              expect(wrapper.state().currentStory.index).toBe(0);
            });
          });

          describe('but the following friend loops to the beggining of friend\'s list', () => {
            beforeEach(() => {
              wrapper.setState({ 
                currentStories: mockData.friends[6].stories,
                currentStory: mockData.friends[6].stories[2],
                autoPlayNext: true 
              });
              wrapper.instance().playNext();
            });
            it('should loop back to the beginning of the user\'s first friend\'s story', () => {
              expect(wrapper.state().currentStory.id).toBe(0);
              expect(wrapper.state().currentStory.index).toBe(0);
            });
          });
        });
      });
    });
  });

  describe('calling setInitialStoriesDuration', () => {
    beforeEach(() => {
      wrapper.setState({
        currentStories: mockData.friends[0].stories,
        currentStory: mockData.friends[0].stories[0]
      });
      wrapper.instance().setDurationCounter();
    });
  });
});