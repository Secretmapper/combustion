import React, { Component} from 'react';
import cx from 'classnames';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';

import Item from './Item';
import { RadioButton } from 'react-toolbox/lib/radio';
import Ripple from 'react-toolbox/lib/ripple';
import HoldListener from 'components/HoldListener'; 

import styles from './styles/index.css';

function Li({ children, style, className, onClick, tabIndex, onMouseDown, onTouchStart }) {
  return (
    <li
      className={className}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      tabIndex={tabIndex}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
    <div 
      onClick={onClick}
    >
      {children}
      </div>
    </li>
  )
}
const RippledLi = Ripple({ spread: 3 })(Li)

@CSSModules(styles)
class SelectableList extends Component {

  @autobind onKeyDown(event) {
    const { children, lastSelectedItemId } = this.props;
    const code = event.nativeEvent.code;
    const childIds = children.map((child) => child.props.id);
    const position = childIds.indexOf(lastSelectedItemId);
    let newSelectedId;

    if (code === 'ArrowUp') {
      newSelectedId = childIds[position - 1];
    }

    if (code === 'ArrowDown') {
      newSelectedId = childIds[position + 1];
    }

    if (newSelectedId) {
      this.props.onSelectItem(newSelectedId);
    }
  }

  @autobind onContextMenu(event, id) {
    const {selectedItemIds} = this.props;

    if (!selectedItemIds.includes(id)) {
      this.props.onSelectItem(id);
    }
  }

  @autobind onRadio(id) {
    console.log(id)
  }

  @autobind onClick(event, id) {
    if (event.nativeEvent.target.hasAttribute('data-react-toolbox') || event.ctrlKey || event.metaKey) {
      this.props.onToggleSelectItem(id);
      return true;
    }

    if (event.shiftKey) {
      const { children, lastSelectedItemId } = this.props;

      const childIds = children.map((child) => child.props.id);
      const selectedTorrentIndex = childIds.indexOf(id);
      const lastSelectedTorrentIndex = childIds.indexOf(lastSelectedItemId);
      const [lower, upper] = [lastSelectedTorrentIndex, selectedTorrentIndex].sort();
      const selectedIds = childIds.filter((_, index) => index >= lower && index <= upper);

      this.props.onSelectRange(id, selectedIds);
      return true;
    }

    this.props.onSelectItem(id);
    return true;
  }

  onHold = (id) => _ =>  {
    this.props.onToggleSelectItem(id);
  }

  render() {
    const {selectedItemIds} = this.props;

    return (
      <ul styleName='list' onKeyDown={this.onKeyDown}>
        {this.props.children.map((child, index) => {
          const childId = child.props.id;
          const isSelected = selectedItemIds.includes(childId);
          const isEven = index % 2 === 1; // Zero indexed.
          const className = `${styles.row} ${isSelected ? styles.selected : ''} ${isEven ? styles.even : ''}`;

          return (
            <HoldListener key={index} onHold={this.onHold(childId)} onClick={(event) => this.onClick(event, childId)} >
              <RippledLi
                className={className}
                onContextMenu={(event) => this.onContextMenu(event, childId)}
                tabIndex={0}
                theme={{
                  ripple: styles.rippleActive,
                  rippleActive: styles.rippleActive
                }}
              >
                <div styleName='listItem'>
                  <RadioButton
                    className={cx(styles.radioButton)}
                    checked={selectedItemIds.includes(childId)}
                  />
                  {child}
                </div>
              </RippledLi>
            </HoldListener>
          );
        })}
      </ul>
    );
  }
}

SelectableList.Item = Item;

export default SelectableList;
