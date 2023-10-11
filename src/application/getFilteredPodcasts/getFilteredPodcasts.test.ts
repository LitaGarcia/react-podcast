import {GetFilteredPodcasts} from "./getFilteredPodcasts";
import {Podcast} from "../../domain/model/podcast";

describe('getFilteredPodcasts', () => {
    const podcasts: Podcast[] = [{
        id: 1,
        img: 'im:image',
        name: 'kiara',
        author: 'KiaraAuthor',
        description: 'description'
    },
        {
            id: 2,
            img: 'im:image',
            name: 'joHn',
            author: 'JohnAuthor',
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
                    author: 'JohnAuthor',
                    description: 'description'
                }
            ])
        }
    )

    it(
        'should return a filtered podcast by author', () => {
            const getFilteredPodcasts = new GetFilteredPodcasts();
            const authorToSearch = 'KiaraAuthor';

            const response = getFilteredPodcasts.execute(podcasts, authorToSearch)

            expect(response).toEqual([
                {
                    id: 1,
                    img: 'im:image',
                    name: 'kiara',
                    author: 'KiaraAuthor',
                    description: 'description'
                }
            ])
        }
    )
})