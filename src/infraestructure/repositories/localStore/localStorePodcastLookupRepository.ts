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
        localStorage.setItem(`${key}-${podcastLookup.id}`, JSON.stringify(podcastToSave))
    },

    getPodcastLookup: (id: number): PodcastLookUp => {
        const savedPodcast: PodcastLookupEntity = JSON.parse(localStorage.getItem(`${key}-${id}`) ?? '{storedAt: 0, podcastLookup: {}}')
        return savedPodcast.podcastLookup
    },

    getStoredDate: (id:number): number => {
        const savedPodcast: PodcastLookupEntity = JSON.parse(localStorage.getItem(`${key}-${id}`) ?? '{"storedAt": 0, "podcasts": []}')
        return savedPodcast.storedAt
    }
})


