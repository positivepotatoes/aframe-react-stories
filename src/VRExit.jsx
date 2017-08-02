import React from 'react';

class VRExit extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateWhen = this.props.animations;

    let exit = this.exit;
    let exitButton = this.exitButton;
    let exitText1 = this.exitText1;
    let exitText2 = this.exitText2;
    this.props.addToAnimationRefs(exit)
    this.props.addToAnimationRefs(exitButton)
    this.props.addToAnimationRefs(exitText1)
    this.props.addToAnimationRefs(exitText2)

    if (this.props.enableAnimation) {
      exit.setAttribute('position', '0 -2 -3');
      exit.setAttribute('animation__playpos', animateWhen('playing', 'moveTo', '-.3 -2 -3'));
      exit.setAttribute('animation__puasepos', animateWhen('stopping', 'moveTo', '0 -2 -3'));

      exitButton.setAttribute('animation__color', animateWhen('always', 'fadingTo', '#8e8e8e'));
      exitButton.setAttribute('animation__shrinking', animateWhen('always', 'shrinkingTo', '.95 .95 .95'));

      exitText1.setAttribute('animation__showtext', animateWhen('stopping', 'fadeTextTo', '1'));
      exitText1.setAttribute('animation__hidetext', animateWhen('playing', 'fadeTextTo', '0'));

      exitText2.setAttribute('animation__showtext', animateWhen('playing', 'fadeTextTo', '1'));
      exitText2.setAttribute('animation__hidetext', animateWhen('stopping', 'fadeTextTo', '0'));
    }
  }

  render() {
    let exitText1Opacity = '1';
    let exitText2Opacity = '0';
    if (!this.props.enableAnimation) {
      if (this.props.currentStory.index !== -2) {
        exitText1Opacity = '0';
        exitText2Opacity = '1';
      }
    }

    return (
      <a-entity position='-.3 -2 -3' ref={el => this.exit = el}>
        <a-sphere
          ref={el => this.exitButton = el}
          radius='.135'
          rotation= '76 0 0'
          color='#c6c6c6'
          material='transparent: true; opacity: .48'
          onClick={() => {
            this.props.setSplashScreen();
            if (this.props.currentStory.index === -2) {
              this.props.exitCallback();
            }
          }}
        />
        <a-text 
          ref={el => this.exitText1 = el}
          value='Exit'
          width='2'
          align='center'
          position='0 -.13 .12'
          opacity={exitText1Opacity}
        />
        <a-text 
          ref={el => this.exitText2 = el}
          id='exittext2'
          value='Stop'
          width='2'
          align='center'
          position='0 -.13 .12'
          opacity={exitText2Opacity}
        />
      </a-entity>
    )
  }
};

export default VRExit;