## Install
Using npm or yarn:
```javascript
$ npm i --save a-frame-react-stories
or
$ yarn add a-frame-react-stories
```

## Usage
In React:
```javascript
import vrStories from 'a-frame-react-stories';
```

## Setup
####Profile:
Each profile should to be formatted as shown below

```javascript
{
  displayName: 'John',
  img_url: 'http://yourprofileimage.com/profile.jpg'
  stories: [
    {
      type: 'image/jpeg',
      src: 'http://yourstoryimage.com/image.jpg'
    },
    {
      type: 'video/mp4',
      src: 'http://your360video.com/video.mp4'
    }
  ]
}
```
The a-frame-react-stories component takes in a **user** prop and **friends** prop. The **user** prop should be a single profile as shown above. The **friends** prop should be a list of profiles as shown above.

####Media Type:
Pictures will need to be specified with the type, 'image/jpeg', 'image/png', 'image', etc..., in order for a-frame-react-stories to display the media in the `img` tag under assets.  Otherwise, all other types will default to playing in the `video` tag.

####Assets Callback:
The a-frame-react-stories component takes in a callback function through the `assetsCallback` prop.  Once mounted, the a-frame-react-stories component will call the callback function in the `assetsCallback` and pass back a list of assets in either `<img>` or `<video>` tags. 
The component creates the list of assets because it tags each media element with a unique ID which is used to keep track of the story playback logic.

## Props

| Props             | Description                                                             | Default Value | Values            |
|-------------------|-------------------------------------------------------------------------|---------------|-------------------|
| autoPlayNext      | Autoplay the next friend's story when current friend's stories end      | false         | true or false     |
| autoPlayStart     | Autoplay the first friend's story when loaded                           | false         | true or false     |
| enableAnimation   | Animates icons                                                          | false         | true or false     |
| defaultDuration   | Duration for showing pictures                                           | 7000          | choose in ms      |
| exitCallback      | Gets called when exit button is clicked                                 |               | callback function |
| assetsCallback    | Gets called when initiated and returns a list of assets for all stories |               | callback function |
| viewCountCallback | Gets called when a story is played and returns the story that is played |               | callback function |
| user              | This profile will show at the beginning of stories                      |               | profile    |
| friends           | These are list of profiles to show stories of for each user |            |      list of profiles |

##Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import 'aframe';
import 'aframe-animation-component';
import 'aframe-mouse-cursor-component';
import vrStories from 'a-frame-react-stories';

class App extends React.Component {
  constructor() {
    super()
    this.state({
      user: {},
      friends: [],
      storyAssets: []
    });
  }

  assetsCallback(assets) {
    this.setState({ assets });
  }

  return () {
    render(
      <a-scene>
        <a-assets>
          {this.state.storyAssets}
        </a-assets>
        <vrStories 
          user={this.state.user}
          friends={this.state.friends}
          assetsCallback={this.assetsCallback.bind(this)}
        />
      </a-scene>
    )
  }
}
```