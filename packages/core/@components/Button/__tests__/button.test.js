import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button.web.jsx';

describe('button', () => {
  it('should render', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
