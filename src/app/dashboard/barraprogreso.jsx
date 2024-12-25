"use client";
import React, { useEffect, useState, useCallback } from "react";
//import './ProgressBar.css';

const ProgressBar = ({ startDate, endDate }) => {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Define calculateProgress fuera de useEffect
  const calculateProgress = useCallback(() => {
    const now = new Date();
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

    const totalDuration = endTime - startTime;
    const elapsedDuration = now - startTime;

    const percentage = (elapsedDuration / totalDuration) * 100;
    setProgress(percentage);
    setElapsedTime(elapsedDuration);

    if (percentage >= 100) {
      setTotalTime(elapsedDuration);
    }
  }, [startDate, endDate]); // Asegúrate de incluir startDate y endDate en las dependencias

  useEffect(() => {
    calculateProgress(); // Llamar a la función al iniciar
    const interval = setInterval(() => {
      calculateProgress(); // Actualizar cada 10 minutos
    }, 600000); // 600000 ms = 10 minutos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, [calculateProgress]); // Dependencia de la función

  const formatTime = (timeInMillis) => {
    const hours = Math.floor(timeInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((timeInMillis % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getBarClass = () => {
    if (progress < 50) return "progress-bar-green";
    if (progress < 75) return "progress-bar-yellow";
    return "progress-bar-red";
  };

  return (
    <div className="progress-bar-container">
      <div
        className={`progress-bar ${getBarClass()}`}
        style={{
          width: `${Math.min(progress, 100)}%`,
        }}
      />
      <div className="progress-bar-text">
        <p>
          {progress >= 100
            ? `Completado en ${formatTime(totalTime)}`
            : `Tiempo transcurrido: ${formatTime(elapsedTime)}`}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
