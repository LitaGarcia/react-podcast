import {GetFilteredPodcasts} from "./getFilteredPodcasts";
import {Podcast} from "../../domain/model/podcast";

describe('getFilteredPodcasts', () => {
    const podcasts: Podcast[] = [{
        id: 1,
        img: 'im:image',
        name: 'kiara',
        author: 'im:artist',
        description: 'description'
    },
        {
            id: 2,
            img: 'im:image',
            name: 'joHn',
            author: 'im:artist',
            description: 'description'
        }]
    it(
        'should return a filtered podcast', () => {
            const getFilteredPodcasts = new GetFilteredPodcasts();
            const nameToSearch = 'John';

            const response = getFilteredPodcasts.execute(podcasts, nameToSearch)

            expect(response).toEqual([
                {
                    id: 2,
                    img: 'im:image',
                    name: 'joHn',
                    author: 'im:artist',
                    description: 'description'
                }
            ])
        }
    )
})