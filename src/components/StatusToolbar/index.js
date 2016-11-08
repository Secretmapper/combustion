import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import settingsImage from '../../images/settings.png';
import preferencesImage from '../../images/wrench.png';
import turtleImage from '../../images/turtle.png';
import compactImage from '../../images/compact.png';

import styles from './styles';

@CSSModules(styles)
class StatusToolbar extends Component {
  onOpen(){
    alert('open');
  }

  onRemove(){
    alert('remove');
  }

  onPause(){
    alert('pause');
  }

  onResume(){
    alert('resume');
  }

  render() {
    return (
      <div styleName='toolbar'>
        <button styleName='button'>
          <img src={settingsImage} alt='Settings'/>
        </button>
        <button styleName='button'>
          <img src={preferencesImage} alt='Preferences'/>
        </button>
        <button styleName='button'>
          <img src={turtleImage} alt='Speed limit'/>
        </button>
        <button styleName='button'>
          <img src={compactImage} alt='Compact view'/>
        </button>
      </div>
    );
  }
}

export default inject('view_store')(observer(StatusToolbar));
