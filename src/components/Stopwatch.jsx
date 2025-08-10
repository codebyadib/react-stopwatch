import React, { useState, useEffect, useRef } from "react";

// Function to format time into HH:MM:SS:MS format
function formatTime(ms) {
  const hours = Math.floor(ms / 3600000); // Total hours
  const minutes = Math.floor((ms / 60000) % 60); // Remaining minutes after hours
  const seconds = Math.floor((ms / 1000) % 60); // Remaining seconds after minutes
  const milliseconds = Math.floor((ms % 1000) / 10); // Two-digit milliseconds (10ms each unit)

  // Helper function to pad single digit numbers with leading zero (example: 5 => "05")
  const pad = (n) => n.toString().padStart(2, "0");

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    milliseconds: pad(milliseconds),
  };
}

// Component to display the formatted time
const TimerDisplay = ({ hours, minutes, seconds, milliseconds }) => {
  return (
    <p
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono text-gray-900 bg-white rounded-xl shadow-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 select-none border border-gray-200 text-center"
      aria-label={`Timer showing ${hours} hours, ${minutes} minutes, ${seconds} seconds and ${milliseconds} milliseconds`}
    >
      {hours}:{minutes}:{seconds}:{milliseconds}
    </p>
  );
};

// Component for Start, Stop, and Reset buttons
const Controls = ({ onStart, onStop, onReset, isRunning }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
      {/* Show Start button if timer is not running, otherwise show Stop button */}
      {!isRunning ? (
        <button
          onClick={onStart}
          className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 text-sm sm:text-base md:text-lg"
          aria-label="Start the stopwatch"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onStop}
          className="bg-red-500 hover:bg-red-600 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 text-sm sm:text-base md:text-lg"
          aria-label="Stop the stopwatch"
        >
          Stop
        </button>
      )}

      {/* Reset button is always shown */}
      <button
        onClick={onReset}
        className="bg-gray-500 hover:bg-gray-600 text-white px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 text-sm sm:text-base md:text-lg"
        aria-label="Reset the stopwatch"
      >
        Reset
      </button>
    </div>
  );
};

// Main Stopwatch component
const Stopwatch = () => {
  const [time, setTime] = useState(0); // Stores elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if stopwatch is running
  const intervalRef = useRef(null); // Stores the setInterval ID to clear later

  // useEffect handles starting and stopping the timer
  useEffect(() => {
    if (isRunning) {
      // Update time every 10 milliseconds
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      // Stop the timer
      clearInterval(intervalRef.current);
    }

    // Cleanup function to stop timer when component unmounts
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Handlers for buttons
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // Get formatted time
  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-green-300 p-4 sm:p-6">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
        Learn Stopwatch ⏱ with React
      </h1>

      {/* Display the timer */}
      <TimerDisplay
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        milliseconds={milliseconds}
      />

      {/* Display the control buttons */}
      <Controls
        onStart={start}
        onStop={stop}
        onReset={reset}
        isRunning={isRunning}
      />
    </div>
  );
};

export default Stopwatch;
