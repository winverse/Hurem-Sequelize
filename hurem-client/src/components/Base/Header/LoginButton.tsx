import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import { shadow } from 'style/styleUtils';

const Wrapper = styled(Link)`
  font-weight: 600;
  color: ${oc.cyan[6]};
  border: 1px solid ${oc.cyan[6]};
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  transition: 0.2s all;
  &:hover {
    background: ${oc.cyan[6]};
    color: white;
    ${shadow(1)};
  }

  &:active {
    transform: translateY(3px);
  }
`;

const LoginButton: React.SFC = () => (
  <Wrapper to="/auth/login">
    로그인 / 가입
  </Wrapper>
);

export default LoginButton;