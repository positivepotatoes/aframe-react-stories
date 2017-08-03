import React from 'react';

class Next extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateWhen = this.props.animations;
    let next = this.next;
    let nextButton = this.nextButton;
    let nextText= this.nextText;
    let playMoveTo = '.3 -2 -3';
    
    if (!this.props.providedExitCallback) {
      playMoveTo = '0 -2 -3';
      next.setAttribute('position', '0 -2 -3');
    }

    this.props.addToAnimationRefs(next);

    if (this.props.enableAnimation) {
      this.props.addToAnimationRefs(nextButton);
      this.props.addToAnimationRefs(nextText);

      next.setAttribute('position', '0 0 -3');
      next.setAttribute('animation__playpos', animateWhen('playing', 'moveTo', playMoveTo));
      next.setAttribute('animation__pausepos', animateWhen('stopping', 'moveTo', '0 0 -3'));

      nextButton.setAttribute('height', '.47');
      nextButton.setAttribute('radius-top', '.016');
      nextButton.setAttribute('radius-bottom', '.26');
      nextButton.setAttribute('animation__color', animateWhen('always', 'fadingTo', '#8e8e8e'));
      nextButton.setAttribute('animation__bounce', animateWhen('always', 'tiltingTo', '1.8'));
      nextButton.setAttribute('animation__playsize', animateWhen('playing', 'scaleTo', '.5 .5 .5'));
      nextButton.setAttribute('animation__pausesize', animateWhen('stopping', 'scaleTo', '1 1 1'));

      nextText.setAttribute('opacity', '0');
      nextText.setAttribute('animation__showtext', animateWhen('playing', 'fadeTextTo', '1'));
      nextText.setAttribute('animation__hidetext', animateWhen('stopping', 'fadeTextTo', '0'));
    } else {
      nextText.setAttribute('opacity', '1');
      next.addEventListener('playing', () => {
        nextText.setAttribute('value', 'Next')
      });
      next.addEventListener('stopping', () => {
        nextText.setAttribute('value', 'Play')
      });
    }
  }

  render() {
    return (
      <a-entity position='.3 -2 -3' rotation='0 0 270' ref={el => this.next = el}>
        <a-cone
          color='#c6c6c6'
          height='.235'
          radius-top='.004'
          radius-bottom='.13'
          onClick={this.props.playNext}
          material='transparent: true; opacity: .55'
          ref={el => this.nextButton = el}
        />
        <a-text 
          ref='nexttext'
          value='Play'
          width='2'
          align='center'
          rotation='0 0 90'
          position='.23 0 0'
          ref={el => this.nextText = el}
        />
      </a-entity>
    )
  }
};

export default Next;