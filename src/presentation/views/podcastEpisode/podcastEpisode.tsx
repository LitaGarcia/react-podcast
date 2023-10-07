import {useNavigate} from "react-router-dom";
import {Episode} from "../../../domain/model/episode";


export default function PodcastEpisode(props: any){
    console.log(props)
    const navigate = useNavigate();
    const episodeList = props.episodes?.map((episode: Episode, i: number) => {
        return (
            <>
            <li onClick={() => navigate(`/podcast/${props.id}/episode/${episode.id}`) } key={i}>
                <p>{episode.title}</p>
            </li>
            </>
        )
    })
return(
    <>

        <p>{episodeList}</p>

    </>
)
}