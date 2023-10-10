import {useNavigate} from "react-router-dom";
import {Episode} from "../../../../domain/model/episode";
import {Th, Link} from "./podcastDetailsEpisodes.styles";


export default function PodcastDetailsEpisodes(props: any ){
    const navigate = useNavigate();


    const episodeList = props.podcast.episodes.map((episode: Episode) => {
        return (
            <>

            <Th>
                <td>
                    <Link onClick={() => navigate(`/podcast/${props.podcast.id}/episode/${episode.id}`) } key={props.podcast.id}>
                    {episode.title}
                </Link>
                </td>
                <td>{episode.releaseDate}</td>
                <td>{episode.trackTime}</td>
            </Th>
            </>
        )
    })


return(
    <>
        {episodeList}
    </>
)
}