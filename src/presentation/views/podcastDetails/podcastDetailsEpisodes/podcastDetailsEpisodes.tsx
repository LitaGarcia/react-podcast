import {useNavigate} from "react-router-dom";
import {Episode} from "../../../../domain/model/episode";


export default function PodcastDetailsEpisodes(props: any ){
    const navigate = useNavigate();


    const episodeList = props.podcast.episodes.map((episode: Episode, i: number) => {
        return (
            <>
            <li onClick={() => navigate(`/podcast/${props.podcast.id}/episode/${episode.id}`) } key={i}>
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