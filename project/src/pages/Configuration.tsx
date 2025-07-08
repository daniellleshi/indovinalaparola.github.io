import React, { useState } from 'react';
import { Settings, Users, Clock, Target, Play, Copy, Check, ArrowLeft } from 'lucide-react';
import { GameConfig, Team, Player } from '../types/game';
import { useGame } from '../context/GameContext';

interface ConfigurationProps {
  onBack: () => void;
  onStart: (config: GameConfig, teams: Team[]) => void;
}

const Configuration: React.FC<ConfigurationProps> = ({ onBack, onStart }) => {
  const { room, createRoom } = useGame();
  const [config, setConfig] = useState<GameConfig>({
    difficulty: 'easy',
    maxPasses: 5,
    timeLimit: 60,
  });

  const [teams, setTeams] = useState<Team[]>([
    {
      id: 'team1',
      name: 'Squadra 1',
      players: [
        { id: 'p1', name: '', role: 'player' },
        { id: 'p2', name: '', role: 'player' },
        { id: 'p3', name: '', role: 'guesser' },
      ],
      score: 0,
      totalPasses: 0,
    },
    {
      id: 'team2',
      name: 'Squadra 2',
      players: [
        { id: 'p4', name: '', role: 'player' },
        { id: 'p5', name: '', role: 'player' },
        { id: 'p6', name: '', role: 'guesser' },
      ],
      score: 0,
      totalPasses: 0,
    },
  ]);

  const [customTime, setCustomTime] = useState(60);
  const [roomCreated, setRoomCreated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePlayerNameChange = (teamIndex: number, playerIndex: number, name: string) => {
    setTeams(prev => prev.map((team, tIndex) => 
      tIndex === teamIndex 
        ? {
            ...team,
            players: team.players.map((player, pIndex) => 
              pIndex === playerIndex ? { ...player, name } : player
            )
          }
        : team
    ));
  };

  const handleTeamNameChange = (teamIndex: number, name: string) => {
    setTeams(prev => prev.map((team, tIndex) => 
      tIndex === teamIndex ? { ...team, name } : team
    ));
  };

  const isFormValid = () => {
    return teams.every(team => 
      team.players.every(player => player.name.trim() !== '') &&
      team.players.filter(p => p.role === 'guesser').length === 1
    );
  };

  const handleCreateRoom = () => {
    if (isFormValid()) {
      const finalConfig = {
        ...config,
        timeLimit: config.timeLimit === 0 ? customTime : config.timeLimit
      };
      createRoom(finalConfig, teams);
      setRoomCreated(true);
    }
  };

  const handleStart = () => {
    onStart(config, teams);
  };

  const copyRoomCode = async () => {
    if (room?.id) {
      try {
        await navigator.clipboard.writeText(room.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = room.id;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Indietro</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Configurazione Partita</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Room Code Display */}
          {roomCreated && room && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-6">STANZA CREATA!</h2>
                <div className="bg-white/20 rounded-xl p-6 mb-6 inline-block">
                  <p className="text-lg mb-3 opacity-90">Codice Stanza:</p>
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-4xl font-bold font-mono bg-white text-green-600 px-4 py-2 rounded-lg">
                      {room.id}
                    </span>
                    <button
                      onClick={copyRoomCode}
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                      title="Copia codice"
                    >
                      {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-sm mt-3 opacity-90">Codice copiato!</p>
                  )}
                </div>
                <p className="text-lg mb-6 opacity-90">
                  Condividi questo codice con gli indovinatori
                </p>
                <button
                  onClick={handleStart}
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-xl transition-colors flex items-center space-x-3 mx-auto"
                >
                  <Play size={24} />
                  <span>INIZIA PARTITA</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Game Settings */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 ${roomCreated ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3 text-gray-800">
              <Settings className="text-blue-600" size={28} />
              <span>Impostazioni di Gioco</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Difficoltà
                </label>
                <select
                  value={config.difficulty}
                  onChange={(e) => setConfig(prev => ({ ...prev, difficulty: e.target.value as 'easy' | 'hard' }))}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  disabled={roomCreated}
                >
                  <option value="easy">Facile (nessuna penalità)</option>
                  <option value="hard">Difficile (-1 punto per errore)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Passi Massimi
                </label>
                <select
                  value={config.maxPasses}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxPasses: parseInt(e.target.value) }))}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  disabled={roomCreated}
                >
                  <option value={3}>3 passi</option>
                  <option value={5}>5 passi</option>
                  <option value={10}>10 passi</option>
                  <option value={999}>Illimitati</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tempo Limite
                </label>
                <select
                  value={config.timeLimit}
                  onChange={(e) => setConfig(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none transition-colors"
                  disabled={roomCreated}
                >
                  <option value={30}>30 secondi</option>
                  <option value={60}>60 secondi</option>
                  <option value={90}>90 secondi</option>
                  <option value={0}>Personalizzato</option>
                </select>
              </div>
              
              {config.timeLimit === 0 && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tempo Personalizzato (secondi)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="300"
                    value={customTime}
                    onChange={(e) => setCustomTime(parseInt(e.target.value))}
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none transition-colors"
                    disabled={roomCreated}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Team Configuration */}
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${roomCreated ? 'opacity-50 pointer-events-none' : ''}`}>
            {teams.map((team, teamIndex) => (
              <div key={team.id} className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center space-x-3 text-gray-800">
                  <Users className="text-blue-600" size={24} />
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleTeamNameChange(teamIndex, e.target.value)}
                    className="bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none flex-1"
                    placeholder="Nome squadra"
                    disabled={roomCreated}
                  />
                </h3>
                
                <div className="space-y-4">
                  {team.players.map((player, playerIndex) => (
                    <div key={player.id} className="flex space-x-3">
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => handlePlayerNameChange(teamIndex, playerIndex, e.target.value)}
                        placeholder={`Giocatore ${playerIndex + 1}`}
                        className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 outline-none transition-colors"
                        disabled={roomCreated}
                      />
                      <div className={`px-4 py-3 rounded-xl font-semibold text-sm ${
                        player.role === 'guesser'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {player.role === 'guesser' ? 'Indovinatore' : 'Giocatore'}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Nota:</strong> Un indovinatore per squadra
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Create Room Button */}
          {!roomCreated && (
            <div className="text-center">
              <button
                onClick={handleCreateRoom}
                disabled={!isFormValid()}
                className={`px-12 py-4 rounded-xl text-xl font-bold transition-all shadow-lg flex items-center space-x-3 mx-auto ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Users size={24} />
                <span>CREA STANZA</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuration;