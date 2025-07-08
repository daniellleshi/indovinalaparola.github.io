import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Welcome from './pages/Welcome';
import Configuration from './pages/Configuration';
import GameRoom from './pages/GameRoom';
import RoomJoin from './pages/RoomJoin';
import { GameConfig, Team } from './types/game';

type AppState = 'welcome' | 'configuration' | 'room-join' | 'game';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('welcome');

  const handleStart = () => {
    setCurrentState('configuration');
  };

  const handleConfigurationStart = (config: GameConfig, teams: Team[]) => {
    setCurrentState('game');
  };

  const handleBack = () => {
    switch (currentState) {
      case 'configuration':
        setCurrentState('welcome');
        break;
      case 'room-join':
        setCurrentState('welcome');
        break;
      case 'game':
        setCurrentState('configuration');
        break;
      default:
        setCurrentState('welcome');
    }
  };

  const handleHome = () => {
    setCurrentState('welcome');
  };

  const handleJoinRoom = () => {
    setCurrentState('room-join');
  };

  const handleRoomJoined = () => {
    setCurrentState('game');
  };

  const renderCurrentPage = () => {
    switch (currentState) {
      case 'welcome':
        return <Welcome onStart={handleStart} onJoinRoom={handleJoinRoom} />;
      case 'configuration':
        return <Configuration onBack={handleBack} onStart={handleConfigurationStart} />;
      case 'room-join':
        return <RoomJoin onBack={handleBack} onJoin={handleRoomJoined} />;
      case 'game':
        return <GameRoom onBack={handleBack} onHome={handleHome} />;
      default:
        return <Welcome onStart={handleStart} onJoinRoom={handleJoinRoom} />;
    }
  };

  return (
    <GameProvider>
      <div className="min-h-screen">
        {renderCurrentPage()}
      </div>
    </GameProvider>
  );
}

export default App;