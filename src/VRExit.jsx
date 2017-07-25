import React from 'react';
import 'aframe';
import 'aframe-animation-component';
import { Entity } from 'aframe-react';

const VRExit = (props) => (
  <Entity position={{x: 0, y: 0, z: 3}}>
    <Entity id='cylinder'
      geometry={{primitive: 'cylinder', radius: '0.1'}}
      rotation= '0 90 90'
      material={{color: 'red'}}
      events={{click: props.exitCallback, mouseenter: props.toggleInEntity, mouseleave: props.toggleInEntity}}>
    </Entity>
    <Entity text={{value: 'click me to exit', align: 'center', color: 'white', width: 6}} position={{y: -1.8}}/>
  </Entity>
);

export default VRExit;