import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameConfig, Team, Room, WordEntry } from '../types/game';

interface GameContextType {
  room: Room | null;
  deviceRole: 'player' | 'guesser' | null;
  createRoom: (config: GameConfig, teams: Team[]) => string;
  joinRoom: (roomId: string, role: 'player' | 'guesser') => boolean;
  startGame: () => void;
  nextWord: () => void;
  handleGuesserAction: (action: 'stop' | 'pass') => void;
  handlePlayerResponse: (isCorrect: boolean) => void;
  nextTurn: () => void;
  resetGame: () => void;
  updateTimer: (timeLeft: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameAction = 
  | { type: 'CREATE_ROOM'; payload: { config: GameConfig; teams: Team[] } }
  | { type: 'JOIN_ROOM'; payload: { roomId: string; role: 'player' | 'guesser' } }
  | { type: 'START_GAME' }
  | { type: 'NEXT_WORD' }
  | { type: 'GUESSER_ACTION'; payload: 'stop' | 'pass' }
  | { type: 'PLAYER_RESPONSE'; payload: boolean }
  | { type: 'NEXT_TURN' }
  | { type: 'RESET_GAME' }
  | { type: 'UPDATE_TIMER'; payload: number }
  | { type: 'SET_ROOM'; payload: Room };

const words = [
  'CASA', 'MARE', 'SOLE', 'LUNA', 'FIORE', 'ALBERO', 'STRADA', 'PONTE', 'FIUME', 'MONTAGNA',
  'LIBRO', 'MUSICA', 'DANZA', 'TEATRO', 'CINEMA', 'ARTE', 'COLORE', 'PENNELLO', 'QUADRO', 'SCULTURA',
  'CUCINA', 'PIZZA', 'PASTA', 'GELATO', 'CAFFÈ', 'VINO', 'PANE', 'FORMAGGIO', 'OLIO', 'POMODORO',
  'FAMIGLIA', 'AMICO', 'AMORE', 'FELICITÀ', 'SORRISO', 'ABBRACCIO', 'BACIO', 'CUORE', 'EMOZIONE', 'GIOIA',
  'VIAGGIO', 'VACANZA', 'AEREO', 'TRENO', 'MACCHINA', 'BICICLETTA', 'MAPPA', 'VALIGIA', 'HOTEL', 'SPIAGGIA'
];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const gameReducer = (
  state: { room: Room | null; deviceRole: 'player' | 'guesser' | null }, 
  action: GameAction
): { room: Room | null; deviceRole: 'player' | 'guesser' | null } => {
  switch (action.type) {
    case 'CREATE_ROOM':
      const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newRoom: Room = {
        id: roomId,
        host: 'host',
        config: action.payload.config,
        teams: action.payload.teams,
        connectedDevices: [],
        gameState: {
          currentTeam: 0,
          currentWord: getRandomWord(),
          timeLeft: action.payload.config.timeLimit,
          passesUsed: 0,
          isActive: false,
          isPaused: false,
          isGameOver: false,
          winner: null,
          wordHistory: [],
          waitingForResponse: false
        }
      };
      localStorage.setItem('gameRoom', JSON.stringify(newRoom));
      return { ...state, room: newRoom, deviceRole: 'player' };

    case 'JOIN_ROOM':
      const savedRoom = localStorage.getItem('gameRoom');
      if (savedRoom) {
        const room = JSON.parse(savedRoom);
        if (room.id === action.payload.roomId) {
          return { ...state, room, deviceRole: action.payload.role };
        }
      }
      return state;

    case 'START_GAME':
      if (!state.room) return state;
      const startedRoom = {
        ...state.room,
        gameState: {
          ...state.room.gameState,
          isActive: true
        }
      };
      localStorage.setItem('gameRoom', JSON.stringify(startedRoom));
      return { ...state, room: startedRoom };

    case 'NEXT_WORD':
      if (!state.room) return state;
      const roomWithNewWord = {
        ...state.room,
        gameState: {
          ...state.room.gameState,
          currentWord: getRandomWord(),
          waitingForResponse: false
        }
      };
      localStorage.setItem('gameRoom', JSON.stringify(roomWithNewWord));
      return { ...state, room: roomWithNewWord };

    case 'GUESSER_ACTION':
      if (!state.room) return state;
      
      if (action.payload === 'pass') {
        const currentTeam = state.room.teams[state.room.gameState.currentTeam];
        const updatedTeams = state.room.teams.map((team, index) => 
          index === state.room!.gameState.currentTeam 
            ? { ...team, totalPasses: team.totalPasses + 1 }
            : team
        );

        const wordEntry: WordEntry = {
          word: state.room.gameState.currentWord,
          result: 'passed',
          team: state.room.gameState.currentTeam,
          timestamp: Date.now()
        };

        const roomWithPass = {
          ...state.room,
          teams: updatedTeams,
          gameState: {
            ...state.room.gameState,
            passesUsed: state.room.gameState.passesUsed + 1,
            wordHistory: [...state.room.gameState.wordHistory, wordEntry],
            currentWord: getRandomWord()
          }
        };
        localStorage.setItem('gameRoom', JSON.stringify(roomWithPass));
        return { ...state, room: roomWithPass };
      } else if (action.payload === 'stop') {
        const roomWithStop = {
          ...state.room,
          gameState: {
            ...state.room.gameState,
            isPaused: true,
            waitingForResponse: true
          }
        };
        localStorage.setItem('gameRoom', JSON.stringify(roomWithStop));
        return { ...state, room: roomWithStop };
      }
      return state;

    case 'PLAYER_RESPONSE':
      if (!state.room) return state;
      const isCorrect = action.payload;
      const currentTeam = state.room.teams[state.room.gameState.currentTeam];
      
      let newScore = currentTeam.score;
      if (isCorrect) {
        newScore += 1;
      } else if (state.room.config.difficulty === 'hard') {
        newScore = Math.max(0, newScore - 1);
      }

      const updatedTeams = state.room.teams.map((team, index) => 
        index === state.room.gameState.currentTeam 
          ? { ...team, score: newScore }
          : team
      );

      const wordEntry: WordEntry = {
        word: state.room.gameState.currentWord,
        result: isCorrect ? 'correct' : 'wrong',
        team: state.room.gameState.currentTeam,
        timestamp: Date.now()
      };

      const roomWithResponse = {
        ...state.room,
        teams: updatedTeams,
        gameState: {
          ...state.room.gameState,
          isPaused: false,
          waitingForResponse: false,
          wordHistory: [...state.room.gameState.wordHistory, wordEntry],
          currentWord: getRandomWord()
        }
      };
      localStorage.setItem('gameRoom', JSON.stringify(roomWithResponse));
      return { ...state, room: roomWithResponse };

    case 'NEXT_TURN':
      if (!state.room) return state;
      const nextTeam = state.room.gameState.currentTeam === 0 ? 1 : 0;
      const nextTurnRoom = {
        ...state.room,
        gameState: {
          ...state.room.gameState,
          currentTeam: nextTeam,
          passesUsed: 0,
          timeLeft: state.room.config.timeLimit,
          currentWord: getRandomWord(),
          isPaused: false,
          waitingForResponse: false
        }
      };
      localStorage.setItem('gameRoom', JSON.stringify(nextTurnRoom));
      return { ...state, room: nextTurnRoom };

    case 'UPDATE_TIMER':
      if (!state.room) return state;
      const roomWithTimer = {
        ...state.room,
        gameState: {
          ...state.room.gameState,
          timeLeft: action.payload
        }
      };
      localStorage.setItem('gameRoom', JSON.stringify(roomWithTimer));
      return { ...state, room: roomWithTimer };

    case 'SET_ROOM':
      return { ...state, room: action.payload };

    case 'RESET_GAME':
      localStorage.removeItem('gameRoom');
      localStorage.removeItem('deviceRole');
      return { room: null, deviceRole: null };

    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, { 
    room: null, 
    deviceRole: localStorage.getItem('deviceRole') as 'player' | 'guesser' | null 
  });

  const createRoom = (config: GameConfig, teams: Team[]) => {
    dispatch({ type: 'CREATE_ROOM', payload: { config, teams } });
    return state.room?.id || '';
  };

  const joinRoom = (roomId: string, role: 'player' | 'guesser') => {
    localStorage.setItem('deviceRole', role);
    dispatch({ type: 'JOIN_ROOM', payload: { roomId, role } });
    return true;
  };

  const startGame = () => dispatch({ type: 'START_GAME' });
  const nextWord = () => dispatch({ type: 'NEXT_WORD' });
  const handleGuesserAction = (action: 'stop' | 'pass') => dispatch({ type: 'GUESSER_ACTION', payload: action });
  const handlePlayerResponse = (isCorrect: boolean) => dispatch({ type: 'PLAYER_RESPONSE', payload: isCorrect });
  const nextTurn = () => dispatch({ type: 'NEXT_TURN' });
  const resetGame = () => dispatch({ type: 'RESET_GAME' });
  const updateTimer = (timeLeft: number) => dispatch({ type: 'UPDATE_TIMER', payload: timeLeft });

  return (
    <GameContext.Provider value={{
      room: state.room,
      deviceRole: state.deviceRole,
      createRoom,
      joinRoom,
      startGame,
      nextWord,
      handleGuesserAction,
      handlePlayerResponse,
      nextTurn,
      resetGame,
      updateTimer
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};