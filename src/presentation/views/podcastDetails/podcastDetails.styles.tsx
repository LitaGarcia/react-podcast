import styled from "styled-components";

export const PodcastContainer = styled.section `
  border-top: gainsboro 0.5px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: var(--size-m);
  gap: var(--size-m);

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 10rem;
  }
`

export const PodcastDetailedItem = styled.div `
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 250px;
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

export const PodcastDetailedName = styled.h3 `
    margin-bottom: var(--size-sm);
    font-weight: bold;
`
export const PodcastDetailedAuthor = styled.p `
  font-style: italic;
`
export const PodcastDetailedDesc = styled.p `
  margin-bottom: var(--size-sm);
  font-style: italic;
`

export const PodcastDetailedEpisodesTitleContainer = styled.div `
  padding: var(--size-m);
  -moz-box-shadow: -1px 6px 13px 0px rgba(158,158,158,1);
  box-shadow: -1px 6px 13px 0px gainsboro;
  font-size: var(--size-sm);
  font-weight: bold;
  width: 100%;
`
export const PodcastDetailedEpisodesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--size-m);
`