import styled from '@emotion/styled';
import {
  color, buttonStyle, space, fontSize
} from 'styled-system';

const Button = styled('button')(
  {
    appearance: 'button',
    border: 0,
    outline: 0
  },
  buttonStyle,
  color,
  space,
  fontSize
);

Button.defaultProps = {
  variant: 'primary',
  px: 4,
  py: 3,
  fontSize: 2
};

export default Button;
