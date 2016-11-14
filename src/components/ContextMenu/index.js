import React from 'react';
import { Overlay } from 'react-overlays';

import Menu from './Menu';

function ContextMenu(props) {
  // TODO: Container should be App element
  return (
    <Overlay
      show={props.show}
      placement='top'
      target={props.target}
      shouldUpdatePosition={true}
      rootClose={true}
      onHide={props.onHide}
    >
      <Menu {...props} />
    </Overlay>
  );
}

export default ContextMenu;
