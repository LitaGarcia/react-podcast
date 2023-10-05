import { Routes, Route } from 'react-router-dom';
import Landing from "../views/landing";
import React from "react";
import PodcastDetails from "../views/podcastDetails";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Landing/>} />
            <Route path='/podcast/:podcastId' element={<PodcastDetails/>} />
        </Routes>
    );
}
export default MainRoutes;