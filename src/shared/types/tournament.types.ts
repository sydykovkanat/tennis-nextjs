export interface Tournament {
  _id: string;
  name: string;
  participants: number;
  eventDate: string;
  category: string;
  rank: 'male' | 'female' | 'mixed';
  regulationsDoc: string | null | File;
  resultsLink: string;
  registrationLink: string;
  tournamentYear: number;
}

export type Tournaments = {
  [year in 'previousYear' | 'currentYear' | 'nextYear']: {
    [month: string]: Tournament[];
  };
};
