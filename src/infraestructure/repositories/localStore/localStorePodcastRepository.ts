import {StorePodcastRepository} from "../../../domain/storePodcastRepository";
import {PodcastEntity} from "./podcastEntity";
import {Podcast} from "../../../domain/podcast";

const key = 'podcasts'

export const LocalStorePodcastRepository = (): StorePodcastRepository => ({

    save: (podcasts: Podcast[], storedAt: number) => {
        const podcastToSave: PodcastEntity = {
            storedAt: storedAt,
            podcasts: podcasts
        }
        localStorage.setItem(key, JSON.stringify(podcastToSave))
    },

    getPodcasts: (): Podcast[] => {
        const savedPodcast: PodcastEntity = JSON.parse(localStorage.getItem(key) ?? '{storedAt: 0, podcasts: []}')
        return savedPodcast.podcasts
    },

    getStoredDate: (): number => {
        const savedPodcast: PodcastEntity = JSON.parse(localStorage.getItem(key) ?? '{"storedAt": 0, "podcasts": []}')
        return savedPodcast.storedAt
    }
})


