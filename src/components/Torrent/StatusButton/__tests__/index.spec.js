import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import StatusButton from '../';

test('StatusButton resume', () => {
  const component = renderer.create(
    <StatusButton torrent={{isStopped: true}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StatusButton pause', () => {
  const component = renderer.create(
    <StatusButton torrent={{isStopped: false}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('StatusButton onToggle', () => {
  const toggleStatus = jest.fn();

  const component = shallow(
    <StatusButton torrent={{id: 999, isStopped: false}} onToggle={toggleStatus} />
  );

  component.find('button').simulate('click');

  expect(toggleStatus).toHaveBeenCalledWith(999);
});
