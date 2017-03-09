import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';

import Item from './Item';
import HoldListener from 'components/HoldListener'; 

import styles from './styles/index.css';

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

  @autobind onClick(event, id) {
    if (event.ctrlKey || event.metaKey) {
      this.props.onToggleSelectItem(id);
      return;
    }

    if (event.shiftKey) {
      const { children, lastSelectedItemId } = this.props;

      const childIds = children.map((child) => child.props.id);
      const selectedTorrentIndex = childIds.indexOf(id);
      const lastSelectedTorrentIndex = childIds.indexOf(lastSelectedItemId);
      const [lower, upper] = [lastSelectedTorrentIndex, selectedTorrentIndex].sort();
      const selectedIds = childIds.filter((_, index) => index >= lower && index <= upper);

      this.props.onSelectRange(id, selectedIds);
      return;
    }

    this.props.onSelectItem(id);
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
              <li
                className={className}
                onContextMenu={(event) => this.onContextMenu(event, childId)}
                tabIndex={0}
              >
                {child}
              </li>
            </HoldListener>
          );
        })}
      </ul>
    );
  }
}

SelectableList.Item = Item;

export default SelectableList;
