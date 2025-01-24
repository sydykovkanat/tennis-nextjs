import { Base } from './root.types';
import { Tournament } from './tournament.types';
import { User } from './user.types';

export interface TournamentHistory extends Base {
  user: User;
  tournament: Tournament;
}
