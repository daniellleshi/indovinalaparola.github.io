import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
  isPaused: boolean;
  onTimeUp: () => void;
  onTick: (timeLeft: number) => void;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isActive, isPaused, onTimeUp, onTick }) => {
  const [currentTime, setCurrentTime] = useState(timeLeft);

  useEffect(() => {
    setCurrentTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev - 1;
        onTick(newTime);
        
        if (newTime <= 0) {
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, onTimeUp, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getColorClass = () => {
    if (currentTime <= 10) return 'text-red-600';
    if (currentTime <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className={`flex items-center justify-center space-x-2 text-3xl font-bold ${getColorClass()}`}>
      <Clock size={32} />
      <span className="font-mono">{formatTime(currentTime)}</span>
      {isPaused && (
        <span className="text-orange-600 text-lg ml-2">FERMO</span>
      )}
    </div>
  );
};

export default Timer;