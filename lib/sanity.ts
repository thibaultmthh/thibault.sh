import axios from 'axios';

export const sanityGraphql = axios.create({
    baseURL: 'https://uha2by4x.api.sanity.io/v1/graphql/production/default',
});

export interface SanityImage {
    asset: {
        _id: string;
        url: string;
        metadata: {
            dimensions: {
                height: number;
                width: number;
            };
        };
    };
}