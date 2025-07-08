import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowLeft, Home, Clock, Users, Trophy, Pause, Play, ArrowRight, X } from 'lucide-react';
import Timer from '../components/Timer';

interface GameRoomProps {
  onBack: () => void;
  onHome: () => void;
}

const GameRoom: React.FC<GameRoomProps> = ({ onBack, onHome }) => {
  const { 
    room, 
    deviceRole, 
    handleGuesserAction, 
    handlePlayerResponse, 
    nextTurn, 
    updateTimer 
  } = useGame();

  const [gameEnded, setGameEnded] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Nessuna partita trovata
          </h2>
          <p className="text-gray-600 mb-6">
            La stanza potrebbe essere stata chiusa o il codice non è valido
          </p>
          <button
            onClick={onHome}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Torna al Menu
          </button>
        </div>
      </div>
    );
  }

  const { teams, gameState, config } = room;
  const currentTeam = teams[gameState.currentTeam];

  const handleTimeUp = () => {
    if (!gameEnded && gameState.isActive) {
      checkGameEnd();
    }
  };

  const checkGameEnd = () => {
    if (gameState.currentTeam === 1) {
      setGameEnded(true);
    } else {
      nextTurn();
    }
  };

  const determineWinner = () => {
    if (teams[0].score > teams[1].score) return teams[0];
    if (teams[1].score > teams[0].score) return teams[1];
    return teams[0].totalPasses <= teams[1].totalPasses ? teams[0] : teams[1];
  };

  // Game End Screen
  if (gameEnded) {
    const winner = determineWinner();
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-lg">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            {winner.name} Vince!
          </h2>
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl">
              <p className="text-2xl font-bold">
                Punteggio: {winner.score}
              </p>
            </div>
            <div className="text-gray-600">
              <p>Passo utilizzati: {winner.totalPasses}</p>
            </div>
          </div>
          <button
            onClick={onHome}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-xl w-full transition-all"
          >
            Nuova Partita
          </button>
        </div>
      </div>
    );
  }

  // Guesser Interface
  if (deviceRole === 'guesser') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        {/* Header */}
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Home size={20} />
                <span className="font-semibold">Menu</span>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Modalità Indovinatore</h1>
              <div className="w-20"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Score Display */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {teams.map((team, index) => (
                <div
                  key={team.id}
                  className={`p-6 rounded-2xl shadow-lg transition-all ${
                    index === gameState.currentTeam
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white transform scale-105'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">{team.name}</h3>
                    <div className="text-4xl font-bold mb-2">{team.score}</div>
                    <div className="text-sm opacity-75">
                      Passi: {team.totalPasses}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timer and Status */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <Timer
                  timeLeft={gameState.timeLeft}
                  isActive={gameState.isActive && !gameState.isPaused}
                  isPaused={gameState.isPaused}
                  onTimeUp={handleTimeUp}
                  onTick={updateTimer}
                />
                <div className="mt-4">
                  <div className="text-xl font-bold text-gray-800 mb-2">
                    Turno: {currentTeam.name}
                  </div>
                  <div className="text-gray-600">
                    Passi: {gameState.passesUsed} / {config.maxPasses === 999 ? '∞' : config.maxPasses}
                  </div>
                </div>
              </div>

              {/* Guesser Controls */}
              <div className="space-y-6">
                {gameState.waitingForResponse ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-yellow-800 font-bold text-lg">
                      In attesa della valutazione...
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-gray-700 mb-6 text-lg">
                      Ascolta i tuoi compagni e decidi quando rispondere
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => handleGuesserAction('stop')}
                        disabled={gameState.isPaused || !gameState.isActive}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center space-x-3 ${
                          gameState.isPaused || !gameState.isActive
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        }`}
                      >
                        <Pause size={24} />
                        <span>STOP</span>
                      </button>
                      
                      <button
                        onClick={() => handleGuesserAction('pass')}
                        disabled={gameState.passesUsed >= config.maxPasses || gameState.isPaused || !gameState.isActive}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center space-x-3 ${
                          gameState.passesUsed >= config.maxPasses || gameState.isPaused || !gameState.isActive
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        }`}
                      >
                        <ArrowRight size={24} />
                        <span>PASSA</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Player Interface
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
            <h1 className="text-xl font-bold text-gray-800">Intesa Vincente</h1>
            <button
              onClick={onHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home size={20} />
              <span className="font-semibold">Menu</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Score Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {teams.map((team, index) => (
              <div
                key={team.id}
                className={`p-6 rounded-2xl shadow-lg transition-all ${
                  index === gameState.currentTeam
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white transform scale-105'
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl flex items-center space-x-2">
                    <Users size={24} />
                    <span>{team.name}</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Trophy className="text-yellow-400" size={24} />
                    <span className="text-3xl font-bold">{team.score}</span>
                  </div>
                </div>
                <div className="text-sm opacity-75 mb-3">
                  Passi utilizzati: {team.totalPasses}
                </div>
                <div className="space-y-1">
                  {team.players.map((player) => (
                    <div
                      key={player.id}
                      className={`text-xs px-3 py-1 rounded-full ${
                        player.role === 'guesser'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      } ${index === gameState.currentTeam ? 'bg-white/20 text-white' : ''}`}
                    >
                      {player.name} ({player.role === 'guesser' ? 'Indovinatore' : 'Giocatore'})
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Game Area */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-600 mb-2">TURNO</h3>
                <p className="text-2xl font-bold text-gray-800">{currentTeam.name}</p>
              </div>
              
              <div className="text-center">
                <Timer
                  timeLeft={gameState.timeLeft}
                  isActive={gameState.isActive && !gameState.isPaused}
                  isPaused={gameState.isPaused}
                  onTimeUp={handleTimeUp}
                  onTick={updateTimer}
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-600 mb-2">PASSI</h3>
                <p className="text-2xl font-bold text-gray-800">
                  {gameState.passesUsed} / {config.maxPasses === 999 ? '∞' : config.maxPasses}
                </p>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-6 text-white">
                <h2 className="text-5xl font-bold mb-4">{gameState.currentWord}</h2>
                <p className="text-xl opacity-90">Parola da far indovinare</p>
              </div>
            </div>
            
            {/* Player Response Interface */}
            {gameState.waitingForResponse ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">🤔</div>
                <h3 className="text-2xl font-bold text-yellow-800 mb-6">
                  L'indovinatore ha fermato il tempo!
                </h3>
                <p className="text-yellow-700 mb-6 text-lg">
                  La risposta è corretta?
                </p>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => handlePlayerResponse(true)}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3"
                  >
                    <span className="text-2xl">✅</span>
                    <span>CORRETTA</span>
                  </button>
                  
                  <button
                    onClick={() => handlePlayerResponse(false)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3"
                  >
                    <span className="text-2xl">❌</span>
                    <span>SBAGLIATA</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-4">
                  {gameState.isPaused ? 'Tempo fermo - In attesa dell\'indovinatore...' : 'Suggerisci parole per aiutare l\'indovinatore'}
                </p>
                {gameState.isPaused && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-blue-700 font-semibold">
                      L'indovinatore sta pensando alla risposta...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Word History */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center space-x-3">
              <Clock size={28} />
              <span>Storico Parole</span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {gameState.wordHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nessuna parola ancora giocata</p>
              ) : (
                gameState.wordHistory.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                    <span className="font-bold text-gray-800 text-lg">{entry.word}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 font-semibold">
                        {teams[entry.team].name}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        entry.result === 'correct' ? 'bg-green-100 text-green-800' :
                        entry.result === 'passed' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entry.result === 'correct' ? '✅ Corretta' : 
                         entry.result === 'passed' ? '➡️ Passata' : '❌ Sbagliata'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;