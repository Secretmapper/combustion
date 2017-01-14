import React from 'react';
import renderer from 'react-test-renderer';
import ProgressBar from '../';

test('ProgressBar', () => {
  const component = renderer.create(
    <ProgressBar torrent={{isStopped: true, percentDone: 0.5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
