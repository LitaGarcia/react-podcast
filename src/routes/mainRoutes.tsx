import { Routes, Route } from 'react-router-dom';
import PodcastsList from "../views/podcastsList/podcastsList";
import React from "react";
import PodcastDetails from "../views/podcastDetails/podcastDetails";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PodcastsList/>} />
            <Route path='/podcast/:podcastId' element={<PodcastDetails/>} />
        </Routes>
    );
}
export default MainRoutes;