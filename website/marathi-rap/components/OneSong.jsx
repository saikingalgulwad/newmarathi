'use client';
import { useState, useRef, useEffect } from 'react';

const SongPlayer = ({ Image, file, songName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      console.error('Audio reference is null.');
      return;
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleAudioError = (e) => {
      console.error('Audio error:', e.target.error);
      alert('An error occurred while loading the audio file.');
    };

    // Attach event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleAudioError);

    // Cleanup event listeners on unmount
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleAudioError);
    };
  }, [file]); // Include file in the dependency array

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = parseFloat(e.target.value);
    if (audio) {
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center  bg-gray-800 text-gray-200 p-6 rounded-2xl w-full max-w-lg mx-auto m-5 md:p-8 lg:max-w-xl lg:m-10 shadow-lg transition-transform transform hover:scale-105">
      {/* Song Image */}
      <div className="w-full mb-6 relative">
        <div
          className={`w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-4 border-gray-700 shadow-lg overflow-hidden transform transition-transform ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <img
            src={Image}
            alt={songName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Song Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">{songName}</h2>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={file} // Ensure this is a valid .mp3 file path
        preload="metadata"
        onError={() => console.error('Failed to load audio file.')}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Controls */}
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Play Button */}
        <button
          className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out"
          onClick={togglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* Progress Bar */}
        <div className="w-full">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span> {/* Added fallback for duration */}
          </div>
        </div>

        {/* Volume Control */}
        <div className="w-full">
          <label className="block text-sm mb-2 text-gray-400">Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
