import axios from "axios";
import sanityClient_L from "@sanity/client";

export const sanityGraphqlBaseURL = "https://uha2by4x.api.sanity.io/v1/graphql/production/default";
export const sanityGraphql = axios.create({
  baseURL: sanityGraphqlBaseURL,
});

export const sanityClient = sanityClient_L({
  projectId: "uha2by4x",
  dataset: "production",
  useCdn: false, // `false` if you want to ensure fresh data
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
