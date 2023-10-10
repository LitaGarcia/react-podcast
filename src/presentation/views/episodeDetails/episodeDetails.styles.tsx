import styled from "styled-components";

export const Section = styled.section `
  border-top: gainsboro 0.5px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: var(--size-m);
  gap: var(--size-m);
  margin: var(--size-sm);

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 10rem;
  }
`

export const Container = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: var(--size-m);
  -moz-box-shadow: -1px 6px 13px 0px rgba(158,158,158,1);
  box-shadow: -1px 6px 13px 0px gainsboro;
  font-size: var(--size-sm);
  @media (min-width: 1024px) {
    width: 50%;
  }
`

export const Title = styled.h3 `
    margin-bottom: var(--size-sm);
    font-weight: bold;
`

export const Description = styled.p `
  margin-bottom: var(--size-sm);
  font-style: italic;
`

export const Audio = styled.audio `
    width: 100%;
`