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

    exitText1.setAttribute('opacity', '1'); 
    exitText2.setAttribute('opacity', '0');

    this.props.addToAnimationRefs(exit);
    
    if (this.props.enableAnimation) {
      this.props.addToAnimationRefs(exitButton);
      this.props.addToAnimationRefs(exitText1);
      this.props.addToAnimationRefs(exitText2);
      
      exit.setAttribute('position', '0 -2 -3');
      exit.setAttribute('animation__playpos', animateWhen('playing', 'moveTo', '-.3 -2 -3'));
      exit.setAttribute('animation__puasepos', animateWhen('stopping', 'moveTo', '0 -2 -3'));

      exitButton.setAttribute('animation__color', animateWhen('always', 'fadingTo', '#8e8e8e'));
      exitButton.setAttribute('animation__shrinking', animateWhen('always', 'shrinkingTo', '.95 .95 .95'));

      exitText1.setAttribute('animation__showtext', animateWhen('stopping', 'fadeTextTo', '1'));
      exitText1.setAttribute('animation__hidetext', animateWhen('playing', 'fadeTextTo', '0'));

      exitText2.setAttribute('animation__showtext', animateWhen('playing', 'fadeTextTo', '1'));
      exitText2.setAttribute('animation__hidetext', animateWhen('stopping', 'fadeTextTo', '0'));
    } else {
      exit.addEventListener('playing', () => {
        exitText1.setAttribute('opacity', '0'); 
        exitText2.setAttribute('opacity', '1');
      });
      exit.addEventListener('stopping', () => {
        exitText1.setAttribute('opacity', '1'); 
        exitText2.setAttribute('opacity', '0');
      })
    }
  }

  render() {
    return (
      <a-entity position='-.3 -2 -3' ref={el => this.exit = el}>
        <a-sphere
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
          ref={el => this.exitButton = el}
        />
        <a-text 
          value='Exit'
          width='2'
          align='center'
          position='0 -.23 0'
          ref={el => this.exitText1 = el}
        />
        <a-text 
          value='Stop'
          width='2'
          align='center'
          position='0 -.23 0'
          ref={el => this.exitText2 = el}
        />
      </a-entity>
    )
  }
};

export default VRExit;