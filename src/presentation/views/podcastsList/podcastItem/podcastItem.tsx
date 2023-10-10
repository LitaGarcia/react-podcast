import {useNavigate} from "react-router-dom";
import {Li, PodcastTitle, TextContainer} from "./podcastItem.styles";

export default function PodcastItem({podcast}: any){
    const navigate = useNavigate();
    console.log(podcast)
    return (
        <Li onClick={() => navigate(`/podcast/${podcast.id}`)}>
            <img src={podcast.img} alt={podcast.name}></img>
        <TextContainer>
            <PodcastTitle>{podcast.name}</PodcastTitle>
            <p>Author: {podcast.author}</p>
        </TextContainer>
        </Li>
    )
}