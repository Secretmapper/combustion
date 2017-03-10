// https://gist.github.com/adjohu/d6d7388dac9a75b8b469
import React from 'react'
import autobind from 'autobind-decorator';

class HoldListener extends React.Component {
  @autobind handleMouseDown(e) {
    e.persist();
    this.e = e;
    this.timeout = setTimeout(this.onTimeout, this.props.threshold);
  }

  @autobind onTimeout() {
    clearTimeout(this.timeout);
    this.timeout = null;
    this.e = null;

    this.props.onHold();
  }

  handleMouseUp() {
    if (this.timeout) {
      this.props.onClick(this.e);

      clearTimeout(this.timeout);
      this.timeout = null;
      this.e = null;
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  render() {
    return (
      <div onMouseDown={this.handleMouseDown}>
        {this.props.children}
      </div>
    )
  }
}

HoldListener.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  onHold: React.PropTypes.func.isRequired,
  children: React.PropTypes.object.isRequired,
  threshold: React.PropTypes.number
};

HoldListener.defaultProps = {
  threshold: 300
};

export default HoldListener;
