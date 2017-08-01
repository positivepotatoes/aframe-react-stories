import React from 'react';

class VRNext extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateWhen = this.props.animations;

    if (this.props.enableAnimation) {
      let next = document.getElementById('next');
      let nextbutton = document.getElementById('nextbutton');
      let nexttext = document.getElementById('nexttext');

      next.setAttribute('position', '0 0 -3');
      next.setAttribute('animation__playpos', animateWhen('playing', 'moveTo', '.3 -2 -3'));
      next.setAttribute('animation__pausepos', animateWhen('stopping', 'moveTo', '0 0 -3'));

      nextbutton.setAttribute('height', '.47');
      nextbutton.setAttribute('radius-top', '.016');
      nextbutton.setAttribute('radius-bottom', '.26');
      nextbutton.setAttribute('animation__color', animateWhen('always', 'fadingTo', '#8e8e8e'));
      nextbutton.setAttribute('animation__bounce', animateWhen('always', 'tiltingTo', '1.8'));
      nextbutton.setAttribute('animation__playsize', animateWhen('playing', 'scaleTo', '.5 .5 .5'));
      nextbutton.setAttribute('animation__pausesize', animateWhen('stopping', 'scaleTo', '1 1 1'));

      nexttext.setAttribute('opacity', '0');
      nexttext.setAttribute('animation__showtext', animateWhen('playing', 'fadeTextTo', '1'));
      nexttext.setAttribute('animation__hidetext', animateWhen('stopping', 'fadeTextTo', '0'));
    }
  }

  render() {
    let nextText = 'Next';
    if (!this.props.enableAnimation) {
      if (this.props.currentStory.index === -2) {
        nextText = 'Play';
      }
    }

    return (
      <a-entity id='next' position='.3 -2 -3' rotation='0 0 270'>
        <a-cone 
          id='nextbutton'
          color='#c6c6c6'
          height='.235'
          radius-top='.004'
          radius-bottom='.13'
          onClick={this.props.playNext}
          material='transparent: true; opacity: .55'
        />
        <a-text 
          id='nexttext'
          value={nextText}
          width='2'
          opacity='1'
          align='center'
          rotation='0 0 90'
          position='.23 0 0'
        />
      </a-entity>
    )
  }
};

export default VRNext;