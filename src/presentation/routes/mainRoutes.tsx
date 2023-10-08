import {Route, Routes} from 'react-router-dom';

import React from "react";
import PodcastsList from "../views/podcastsList/podcastsList";
import PodcastDetails from "../views/podcastDetails/podcastDetails";
import EpisodeDetails from "../views/podcastEpisode/episodeDetails";


const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PodcastsList/>} />
            <Route path='/podcast/:podcastId' element={<PodcastDetails/>} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetails />} />
        </Routes>
    );
}
export default MainRoutes;