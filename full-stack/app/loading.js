import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 animate-gradient-shift">
      <div className="w-20 h-20 border-8 border-t-white border-opacity-30 border-t-8 rounded-full animate-spin"></div>
      <p className="mt-5 text-white text-lg font-semibold drop-shadow-md">Loading...</p>
    </div>
  );
};

export default LoadingPage;