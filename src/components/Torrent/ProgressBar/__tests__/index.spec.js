import React from 'react';
import renderer from 'react-test-renderer';
import ProgressBar from '../';

test('ProgressBar seeding', () => {
  const component = renderer.create(
    <ProgressBar torrent={{isSeeding: true, percentDone: 0.5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ProgressBar leeching', () => {
  const component = renderer.create(
    <ProgressBar torrent={{isDownloading: true, percentDone: 0.5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ProgressBar paused', () => {
  const component = renderer.create(
    <ProgressBar torrent={{isStopped: true, percentDone: 0.5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ProgressBar magnet', () => {
  const component = renderer.create(
    <ProgressBar torrent={{needsMetaData: true, metadataPercentComplete: 0.5}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
