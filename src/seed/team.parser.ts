// just making a module for parsing, not to be integrated in the final prod code.

import * as fs from 'fs';
import { parseStream } from '@fast-csv/parse';
import { Iplmatch } from 'src/interfaces/iplmatch.interface';
import { Readable } from 'stream';

type CsvTeam = {
  ID: string;
  City: string;
  Date: string;
  Season: string;
  MatchNumber: string;
  Team1: string;
  Team2: string;
  Venue: string;
  TossWinner: string;
  TossDecision: string;
  SuperOver: string;
  WinningTeam: string;
  WonBy: string;
  Margin: string;
  method: string;
  Player_of_Match: string;
  Team1Players: string;
  Team2Players: string;
  Umpire1: string;
  Umpire2: string;
};

const matches: Iplmatch[] = [];

const parsePlayerList = (pl: string): string[] => {
  return JSON.parse(pl.replace(/'/g, '"')) as string[];
};

const stream = fs.createReadStream('matches.csv') as Readable;

parseStream(stream, { headers: true })
  .transform((team: CsvTeam): Iplmatch => {
    try {
      const parsedID = parseInt(team.ID, 10);
      if (isNaN(parsedID)) {
        throw new Error('Invalid ID, ignoring row');
      }
      return {
        ID: parsedID,
        City: team.City,
        Date: team.Date,
        Season: team.Season,
        MatchNumber: parseInt(team.MatchNumber, 10),
        Team1: team.Team1,
        Team2: team.Team2,
        Venue: team.Venue,
        TossWinner: team.TossWinner,
        TossDecision: team.TossDecision,
        SuperOver: team.SuperOver === 'Y',
        WinningTeam: team.WinningTeam,
        WonBy: team.WonBy as 'Wickets' | 'Runs',
        Margin: parseInt(team.Margin, 10),
        method: team.method,
        Player_of_Match: team.Player_of_Match,
        Team1Players: parsePlayerList(team.Team1Players),
        Team2Players: parsePlayerList(team.Team2Players),
        Umpire1: team.Umpire1,
        Umpire2: team.Umpire2,
      };
    } catch (error) {
      console.log('Error parsing row:', error.message);
      return null; // Mark the row as invalid
    }
  })
  .on('error', (error) => console.error('CSV Parsing Error:', error))
  .on('data', (row: Iplmatch) => {
    if (row) {
      matches.push(row);
      // console.log(row); // Log the valid rows
    } else {
      console.log('Row has errors and will be skipped.');
    }
  })
  .on('end', (rowCount: number) => {
    console.log(`Parsed ${rowCount} rows`);
    console.log(matches.length); // Log the length of the matches array here
  });
