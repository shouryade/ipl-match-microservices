export interface Iplmatch {
  ID: number;
  City: string;
  Date: string;
  Season: string;
  MatchNumber: number;
  Team1: string;
  Team2: string;
  Venue: string;
  TossWinner: string;
  TossDecision: string;
  SuperOver: boolean; // need to make a converter for this
  WinningTeam: string;
  WonBy: 'Wickets' | 'Runs';
  Margin: number;
  method: string;
  Player_of_Match: string;
  Team1Players: string[];
  Team2Players: string[];
  Umpire1: string;
  Umpire2: string;
}
