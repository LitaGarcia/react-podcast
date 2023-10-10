import styled from "styled-components";
import '../../styles/variables.css';

export const Li = styled.li `
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: var(--size-m);
      img {
      border-radius: 50%;
        position: relative;
        bottom: -50px;
        z-index: 10;
    }
`

export const PodcastTitle = styled.p `
  text-transform: uppercase;
  font-weight: bold;
`
export const TextContainer = styled.div `
  position: relative;
  padding: 100px 0px 25px;
  top: -50px;
  text-align: center;
  width: 100%;
  -moz-box-shadow: -1px 6px 13px 0px rgba(158,158,158,1);
  box-shadow: -1px 6px 13px 0px gainsboro;
  border: none;
  display: flex;
  flex-direction: column;
  gap: var(--size-m);
`