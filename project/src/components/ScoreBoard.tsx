import React from 'react';
import { Team } from '../types/game';
import { Trophy, Users } from 'lucide-react';

interface ScoreBoardProps {
  teams: Team[];
  currentTeam: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ teams, currentTeam }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {teams.map((team, index) => (
        <div
          key={team.id}
          className={`p-4 rounded-lg border-2 transition-all ${
            index === currentTeam
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg flex items-center space-x-2">
              <Users size={20} />
              <span>{team.name}</span>
            </h3>
            <div className="flex items-center space-x-2">
              <Trophy className="text-yellow-500" size={20} />
              <span className="text-2xl font-bold">{team.score}</span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Passi utilizzati: {team.totalPasses}
          </div>
          <div className="mt-2">
            <div className="text-xs text-gray-500 mb-1">Giocatori:</div>
            <div className="flex flex-wrap gap-1">
              {team.players.map((player, playerIndex) => (
                <span
                  key={player.id}
                  className={`px-2 py-1 rounded text-xs ${
                    player.role === 'guesser'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {player.name} ({player.role === 'guesser' ? 'Indovinatore' : 'Giocatore'})
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;