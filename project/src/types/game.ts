export interface Player {
  id: string;
  name: string;
  role: 'player' | 'guesser';
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  score: number;
  totalPasses: number;
}

export interface GameConfig {
  difficulty: 'easy' | 'hard';
  maxPasses: number;
  timeLimit: number;
}

export interface WordEntry {
  word: string;
  result: 'correct' | 'passed' | 'wrong';
  team: number;
  timestamp: number;
}

export interface GameState {
  currentTeam: number;
  currentWord: string;
  timeLeft: number;
  passesUsed: number;
  isActive: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  winner: Team | null;
  wordHistory: WordEntry[];
  waitingForResponse: boolean;
}

export interface Room {
  id: string;
  host: string;
  config: GameConfig;
  teams: Team[];
  gameState: GameState;
  connectedDevices: string[];
}