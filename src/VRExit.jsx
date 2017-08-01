import React from 'react';

class VRExit extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateWhen = this.props.animations;
    let exit = document.getElementById('exit');
    let exitbutton = document.getElementById('exitbutton');
    let exittext1 = document.getElementById('exittext1');
    let exittext2 = document.getElementById('exittext2');

    if (this.props.enableAnimation) {
      exit.setAttribute('position', '0 -2 -3');
      exit.setAttribute('animation__playpos', animateWhen('playing', 'moveTo', '-.3 -2 -3'));
      exit.setAttribute('animation__puasepos', animateWhen('stopping', 'moveTo', '0 -2 -3'));

      exitbutton.setAttribute('animation__color', animateWhen('always', 'fadingTo', '#8e8e8e'));
      exitbutton.setAttribute('animation__shrinking', animateWhen('always', 'shrinkingTo', '.95 .95 .95'));

      exittext1.setAttribute('animation__showtext', animateWhen('stopping', 'fadeTextTo', '1'));
      exittext1.setAttribute('animation__hidetext', animateWhen('playing', 'fadeTextTo', '0'));

      exittext2.setAttribute('animation__showtext', animateWhen('playing', 'fadeTextTo', '1'));
      exittext2.setAttribute('animation__hidetext', animateWhen('stopping', 'fadeTextTo', '0'));
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
      <a-entity id='exit' position='-.3 -2 -3'>
        <a-sphere
          id='exitbutton'
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
          id='exittext1'
          value='Exit'
          width='2'
          align='center'
          position='0 -.13 .12'
          opacity={exitText1Opacity}
        />
        <a-text 
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