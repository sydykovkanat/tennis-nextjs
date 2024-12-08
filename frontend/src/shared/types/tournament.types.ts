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

export interface TournamentMutation {
  name: string;
  participants: string;
  eventDate: string;
  category: string;
  rank: 'male' | 'female' | 'mixed' | '';
  regulationsDoc: File | null | string;
  resultsLink: string;
  registrationLink: string;
  tournamentYear: string;
}

export type Tournaments = {
  [year in 'previousYear' | 'currentYear' | 'nextYear']: {
    [month: string]: Tournament[];
  };
};

export interface UpdateTournamentArg {
  id: string;
  tournamentMutation: TournamentMutation;
}
