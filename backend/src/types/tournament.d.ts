export interface TournamentFields {
  name: string;
  participants: number;
  eventDate: Date;
  category: string;
  rank: 'male' | 'female' | 'mixed';
  regulationsDoc: string | null;
  resultsLink: string;
  registrationLink: string;
  tournamentYear: number;
}
