import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Users, Hash, ArrowLeft, Smartphone, Monitor } from 'lucide-react';

interface RoomJoinProps {
  onBack: () => void;
  onJoin: () => void;
}

const RoomJoin: React.FC<RoomJoinProps> = ({ onBack, onJoin }) => {
  const { joinRoom } = useGame();
  const [roomCode, setRoomCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<'player' | 'guesser' | null>(null);
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!roomCode.trim()) {
      setError('Inserisci il codice della stanza');
      return;
    }

    if (!selectedRole) {
      setError('Seleziona il tuo ruolo');
      return;
    }

    const success = joinRoom(roomCode.toUpperCase(), selectedRole);
    if (success) {
      onJoin();
    } else {
      setError('Stanza non trovata o codice non valido');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Indietro</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Unisciti alla Partita</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Unisciti alla Partita
              </h2>
              <p className="text-gray-600">
                Inserisci il codice della stanza e seleziona il tuo ruolo
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Codice Stanza
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 outline-none text-center text-lg font-mono transition-colors"
                    maxLength={6}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4">
                  Seleziona il tuo ruolo
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setSelectedRole('player')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                      selectedRole === 'player'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    <Monitor size={24} />
                    <div className="text-left">
                      <div className="font-bold">Giocatore</div>
                      <div className="text-sm opacity-75">Vedo la parola e controllo il gioco</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setSelectedRole('guesser')}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                      selectedRole === 'guesser'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-300 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    <Smartphone size={24} />
                    <div className="text-left">
                      <div className="font-bold">Indovinatore</div>
                      <div className="text-sm opacity-75">Indovino la parola con Stop/Passa</div>
                    </div>
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-semibold">{error}</p>
                </div>
              )}
              
              <button
                onClick={handleJoin}
                disabled={!roomCode.trim() || !selectedRole}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  roomCode.trim() && selectedRole
                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                UNISCITI ALLA PARTITA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomJoin;