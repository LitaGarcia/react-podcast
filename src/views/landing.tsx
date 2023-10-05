import React, {useCallback, useEffect, useState} from "react";
import {Podcast} from "../domain/podcast";
import {HttpPodcastRepository} from "../infraestructure/repositories/http/httpPodcastRepository";
import {execute} from "../use-cases/getFavouritesTopPodcasts";
import {LocalStoreRepository} from "../infraestructure/repositories/localStore/localStoreRepository";
import {SystemClock} from "../infraestructure/time/systemClock";
import Header from "./header";
import {useNavigate} from "react-router-dom";

function Landing() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');
    const searchByName = (ev: { currentTarget: { value: React.SetStateAction<string>; }; }) => setSearchName(ev.currentTarget.value);

    const getPodcasts = useCallback(async () => {
        {
            const response = await execute(HttpPodcastRepository(), LocalStoreRepository(), SystemClock())
            setPodcasts(response);
        }
    }, []);

    useEffect(() => {
        getPodcasts().then(resp => resp);
    }, []);


    const goToDetails = (id: string) => {
        navigate(`/podcast/${id}`)
    }

    const podcastList = podcasts
        .filter((podcast) =>
            podcast.name.toLowerCase().includes(searchName.toLowerCase())
        ).map((podcast:Podcast, i: number) => {
    return (

        <li onClick={() => goToDetails(podcast.id)}  key={i}>
            <img src={podcast.img} alt={podcast.name}></img>
            <p>{podcast.name}</p>
            <p>{podcast.author}</p>
        </li>
    );
});

    return (
            <>
                <Header></Header>

                <main>
                    <form>
                        <input
                            type="text"
                            name="searchName"
                            id="searchName"
                            onChange={searchByName}
                            value={searchName}
                        ></input>
                    </form>

                    <ul>{podcastList}</ul>
                </main>
            </>
    );
}

export default Landing;