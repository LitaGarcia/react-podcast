import {StorePodcastLookupRepository} from "../../../domain/storePodcastLookupRepository";
import {PodcastLookUp} from "../../../domain/podcastLookUp";
import {PodcastLookupEntity} from "./podcastLookupEntity";

const key = 'podcastLookup'

export const LocalStoreLookupRepository = (): StorePodcastLookupRepository => ({

    save: (podcastLookup: PodcastLookUp, storedAt: number) => {
        const podcastToSave: PodcastLookupEntity = {
            storedAt: storedAt,
            podcastLookup: podcastLookup
        }
        localStorage.setItem(key, JSON.stringify(podcastToSave))
    },

    getPodcastLookup: (): PodcastLookUp => {
        const savedPodcast: PodcastLookupEntity = JSON.parse(localStorage.getItem(key) ?? '{storedAt: 0, podcastLookup: {}}')
        return savedPodcast.podcastLookup
    },

    getStoredDate: (): number => {
        const savedPodcast: PodcastLookupEntity = JSON.parse(localStorage.getItem(key) ?? '{"storedAt": 0, "podcasts": []}')
        return savedPodcast.storedAt
    }
})


