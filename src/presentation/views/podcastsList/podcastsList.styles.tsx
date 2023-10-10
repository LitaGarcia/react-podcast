import styled from "styled-components";
import '../../styles/variables.css';

export const Ul = styled.ul `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: var(--size-m);
  gap: var(--size-m);
  height: 100%;
  width: 100%;
  list-style: none;

  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
  }
`

export const SectionList = styled.section `
  border-top: gainsboro 0.5px solid;
  
`
export const Form = styled.form `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: var(--size-m);
`

export const NumberBox = styled.div `
  padding: 0.5rem;
  color: white;
  border-radius: 25%;
  background-color: blue;
  margin-right: var(--size-m);
`
