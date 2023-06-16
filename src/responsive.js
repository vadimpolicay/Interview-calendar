import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 323px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (max-width: 507px) {
      ${props}
    }
  `;
};