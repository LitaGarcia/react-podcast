import styled from "styled-components";

export const Container = styled.div `
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  -moz-box-shadow: -1px 6px 13px 0px rgba(158,158,158,1);
  box-shadow: -1px 6px 13px 0px gainsboro;
  padding: var(--size-m);
  font-size: var(--size-xs);
  text-align: left;
  img {
    border-radius: 5%;
    margin-bottom: var(--size-m);
  }
  p {
    margin-bottom: var(--size-sm);
  }
`

export const Name = styled.h3 `
    margin-bottom: var(--size-sm);
    font-weight: bold;
`
export const Author = styled.p `
  font-style: italic;
`
export const Description = styled.p `
  margin-bottom: var(--size-sm);
  font-style: italic;
`