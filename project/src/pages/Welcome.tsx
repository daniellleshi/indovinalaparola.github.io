import React from 'react';
import { Play, Trophy, Users, Clock, Target, UserPlus, Zap } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
  onJoinRoom: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart, onJoinRoom }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg">
              <Zap className="text-white" size={48} />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            INTESA VINCENTE
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Il gioco di parole più coinvolgente ispirato a "Reazione a Catena"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStart}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3"
            >
              <Play size={24} />
              <span>CREA PARTITA</span>
            </button>
            
            <button
              onClick={onJoinRoom}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3"
            >
              <UserPlus size={24} />
              <span>UNISCITI</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Game Rules */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center space-x-3">
              <Trophy className="text-yellow-500" size={32} />
              <span>COME SI GIOCA</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">SQUADRE</h3>
                <p className="text-gray-600">
                  Due squadre da 3 giocatori: 2 "Giocatori" che dicono una parola a testa e 1 "Indovinatore"
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">OBIETTIVO</h3>
                <p className="text-gray-600">
                  I giocatori dicono le parole alternandosi per far indovinare la parola target all'indovinatore
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">TEMPO</h3>
                <p className="text-gray-600">
                  Ogni squadra ha un tempo limite configurabile per il proprio turno
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">REGOLE DEL GIOCO</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-700">Il sistema mostra una parola target che solo i giocatori vedono</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-700">I due giocatori si alternano nel suggerire parole</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-700">L'indovinatore può fermare il tempo per rispondere o passare</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-700">Le squadre si alternano completando un turno per volta</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-gray-700">Vince la squadra con il punteggio più alto</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">MODALITÀ DI GIOCO</h3>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="text-xl font-bold text-green-800 mb-3 flex items-center space-x-2">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
                    <span>MODALITÀ FACILE</span>
                  </h4>
                  <p className="text-green-700">
                    Nessuna penalità per le risposte sbagliate. Perfetta per principianti!
                  </p>
                </div>
                
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h4 className="text-xl font-bold text-red-800 mb-3 flex items-center space-x-2">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">!</span>
                    <span>MODALITÀ DIFFICILE</span>
                  </h4>
                  <p className="text-red-700">
                    -1 punto per ogni risposta sbagliata. Solo per i veri amanti del gioco!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-device Info */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mt-8 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">GIOCO MULTI-DISPOSITIVO</h3>
              <p className="text-lg mb-6">
                Usa smartphone e tablet separati per un'esperienza di gioco ancora più coinvolgente!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-white/10 p-4 rounded-xl">
                  <h4 className="font-bold mb-2">👥 GIOCATORI</h4>
                  <p className="text-sm">Vedono la parola target e controllano il gioco</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl">
                  <h4 className="font-bold mb-2">🎯 INDOVINATORI</h4>
                  <p className="text-sm">Si collegano con un codice e hanno solo i pulsanti Stop/Passa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;