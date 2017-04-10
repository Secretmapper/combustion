import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import cx from 'classnames';

import { Button } from 'react-toolbox/lib/button';
import semcmp from 'semver-compare';

import styles from './styles/index.css';

@inject('prefs_store', 'version_store')
@observer
@CSSModules(styles)
class UpdateNotice extends Component {
  state = {
    dismissed: false
  }

  @autobind shouldShow() {
    const { latest } = this.props.version_store;
    if (!latest) return false;

    return !this.state.dismissed && semcmp(process.env.VERSION, latest) < 0;
  }

  @autobind dismiss() {
    this.setState({ dismissed: true })
  }

  render() {
    const { latest } = this.props.version_store;

    return (
      <div className={cx(styles.container, { [styles['container--show']]: this.shouldShow() })}>
        <span styleName='label'>Update available! v{latest}</span>
        <a
          onClick={this.dismiss}
          styleName='buttonlink'
          href='https://github.com/Secretmapper/combustion/releases'
          target='_blank'
        >
          <Button styleName='get-it' label='Get it' />
        </a>
        <Button onClick={this.dismiss}  styleName='dismiss' label='Dismiss' />
      </div>
    );
  }
}

export default UpdateNotice;
