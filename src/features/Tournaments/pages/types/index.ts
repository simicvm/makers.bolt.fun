import { Filter } from "nostr-tools";
import { TrackAndPrizes } from "../OverviewPage/PrizesSection/PrizesSection";

export interface TournamentStaticData {
  chat: {
    type: string;
    link: string;
  };

  partners: Array<{
    link: string;
    image: string;
    isPrimary?: boolean;
  }>;

  tracksAndPrizes: Array<TrackAndPrizes>;

  communityPartners?: Array<{
    link: string;
    image: string;
    isPrimary: boolean;
  }>;

  config: {
    registerationOpen: boolean;
    projectsSubmissionOpen: boolean;
    ideasRootNostrEventId?: string;
  } & (
    | {
        showFeed: true;
        feedFilters: (data: {
          participantsKeys: string[];
          projectsKeys: string[];
        }) => Filter[];
      }
    | {
        showFeed: false;
      }
  );
}
