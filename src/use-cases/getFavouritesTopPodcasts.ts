import {PodcastRepository} from "../domain/podcastRepository";

export const execute = async (podcastRepository: PodcastRepository) => {
    return await podcastRepository.getPodcast()
}