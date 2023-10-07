import {useNavigate} from "react-router-dom";

export default function PodcastItem({podcast}: any){
    const navigate = useNavigate();
    return (
        <li onClick={() => navigate(`/podcast/${podcast.id}`)}>
            <img src={podcast.img} alt={podcast.name}></img>
            <p>{podcast.name}</p>
            <p>{podcast.author}</p>
        </li>
    )
}