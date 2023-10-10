import styled from "styled-components";

export const DetailsSection = styled.section `
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

export const TitleSection = styled.div `
  padding: var(--size-m);
  -moz-box-shadow: -1px 6px 13px 0px rgba(158,158,158,1);
  box-shadow: -1px 6px 13px 0px gainsboro;
  font-size: var(--size-sm);
  font-weight: bold;
  width: 80%;
  @media (min-width: 1024px) {
    width: 100%
  }
`
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--size-m);
`
export const Table = styled.table `
  
  td:first-child{
    width: 80%;
  }
  th:nth-child(odd) {
    background-color: gainsboro;
  }
  th:nth-child(even)  {
    background-color: white;
  }
`