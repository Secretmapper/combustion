import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import Dialog from '../Dialog'
import logoImage from '../../images/logo.png';

import styles from './styles/index.css';

@inject('view_store')
@observer
@CSSModules(styles)
class PromptDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.placeholder,
    };
  }

  @autobind onChange(event) {
    this.props.setState({
      value: event.target.value
    });
  }

  @autobind onSubmit() {
    this.props.onSubmit(this.state.value);
    this.onHide();
  }

  @autobind onDismiss(event) {
    event.preventDefault();
    this.props.onToggle();
  }

  @autobind onHide() {
    this.props.onToggle();
  }

  render() {
    return (
      <Dialog
        show={this.props.toggle}
        onHide={this.onHide}
        header={this.props.header}
      >
        <div styleName='body'>
          <div styleName='logo'>
            <img src={logoImage} alt='logo'></img>
          </div>
          <div styleName='content'>
            { this.props.question &&
              <p>{this.props.question}:</p>
            }
            <input type='text' onChange={this.onChange} value={this.state.value} />

            <section styleName='buttons'>
              <button onClick={this.onHide}>Cancel</button>
              <button onClick={this.onSubmit}>{ this.props.action || 'Ok' }</button>
            </section>
          </div>
        </div>

      </Dialog>
    );
  }
}

export default PromptDialog;
