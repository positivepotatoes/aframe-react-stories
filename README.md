#AFrame React Stories
A plug and play react UI module that lets you quickly add social media style stories into your current VR project. 
Click [here](http://13.56.166.182/) to see the demo.

##Getting Started
###Prerequisites
A-Frame
Aframe-animation-component
React
React-Dom

### Install
Using npm or yarn:
```bash
$ npm i --save aframe-react-stories
or
$ yarn add aframe-react-stories
```

## Usage
In React:
```javascript
import Stories from 'aframe-react-stories';
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
The aframe-react-stories component takes in a **user** prop and **friends** prop. The **user** prop should be a single profile and the **friends** prop should be a list of profiles as shown above.

####Media Type:
Pictures will need to be specified with the type, 'image/jpeg', 'image/png', 'image', etc..., in order for aframe-react-stories to display the media in the `img` tag under assets.  Otherwise, all other types will default to playing in the `video` tag.

####Assets Callback:
The aframe-react-stories component takes in a callback function through the `assetsCallback` prop.  Once mounted, the aframe-react-stories component will run process that tags all the video and image assets for the stories playback logic. It will then pass the processed assets into callback function in the `assetsCallback` once it's done. The list of assets returned needs to be saved inside `<a-assets>` tag for the component to work properly.

####View Callback:
This callback is invoked every time a story is played. It should take in an object that contains the current story and metadata. 

## Props

| Props             | Description                                                                                      | Default Value | Type              |
|-------------------|--------------------------------------------------------------------------------------------------|---------------|-------------------|
| autoPlayNext      | Autoplay the next friend's story when current friend's stories end                               | false         | boolean           |
| autoPlayStart     | Autoplay the first friend's story when loaded                                                    | false         | boolean           |
| enableAnimation   | Animates icons                                                                                   | false         | boolean           |
| defaultDuration   | Duration for showing pictures                                                                    | 7000          | number            |
| exitCallback      | Gets called when exit button is clicked                                                          |               | callback function |
| assetsCallback    | Gets called when initiated. A list of assets to be saved inside `a-assets` is passed in          |               | callback function |
| viewCallback      | Invoked when a story is played. An object with the relevant video data and metadata is passed in |               | callback function |
| user              | This profile will show at the beginning of stories                                               |               | profile           |
| friends           | These are list of profiles to show stories of for each user                                      |               | array of objects  |

##Example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import 'aframe';
import 'aframe-animation-component';
import 'aframe-mouse-cursor-component';
import Stories from 'aframe-react-stories';

class App extends React.Component {
  constructor() {
    super()
    this.state({
      user: {},
      friends: [],
      storyAssets: []
    });
  }

  assetsCallback(storyAssets) {
    this.setState({ storyAssets });
  }

  return () {
    render(
      <a-scene>
        <a-assets>
          {this.state.storyAssets}
        </a-assets>
        <Stories 
          user={this.state.user}
          friends={this.state.friends}
          assetsCallback={this.assetsCallback.bind(this)}
        />
      </a-scene>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```
##Running the tests
Using npm or yarn:
```bash
yarn run test
npm run test
```

##Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/positivepotatoes/aframe-react-stories/tags).

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details