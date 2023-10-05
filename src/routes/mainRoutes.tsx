import { Routes, Route } from 'react-router-dom';
import PodcastsList from "../views/podcastsList/podcastsList";
import React from "react";
import PodcastDetails from "../views/podcastDetails/podcastDetails";
import PodcastEpisode from "../views/podcastEpisode/podcastEpisode";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PodcastsList/>} />
            <Route path='/podcast/:podcastId' element={<PodcastDetails/>} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<PodcastEpisode />} />
        </Routes>
    );
}
export default MainRoutes;