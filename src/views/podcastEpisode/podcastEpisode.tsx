import {useNavigate} from "react-router-dom";

export default function PodcastEpisode({episode}: any){
    const navigate = useNavigate();
    console.log(episode)
return(
    // <li onClick={() => navigate(`/podcast/${props.podcast?.id}/episode/${props.episode.id}`)}>
    //     <p>{props.episode.title}</p>
    // </li>
        <p>{episode}</p>

)
}