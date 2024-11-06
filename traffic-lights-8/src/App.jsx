import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useParams, Outlet } from 'react-router-dom';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import TrafficLights from './components/TrafficLights';
import { TrafficLightsData } from './TrafficLightsData';
import './App.css';

const TrafficLightsPage = ({ data, handleClick, setOrientation, updateLightSettings, togglePower }) => {
  const { direction } = useParams();
  const orientation = direction === 'horisontal' ? 'horizontal' : 'vertical'; 

  return (
    <div className="app-container">
      <TrafficLights
        orientation={orientation}
        data={data}
        handleClick={handleClick}
        togglePower={togglePower}
      />
      <StatsBar
        orientation={orientation}
        setOrientation={setOrientation}
        data={data}
        updateLightSettings={updateLightSettings}
      />
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(
    TrafficLightsData.map(light => ({ ...light, brightness: 0.5, blinkCount: 3, power: true }))
  );
  const [orientation, setOrientation] = useState('vertical');
  const [automaticMode, setAutomaticMode] = useState(false);
  const [currentLightIndex, setCurrentLightIndex] = useState(0); // Додаємо індекс поточного світла
  const [lightSequence, setLightSequence] = useState(['red', 'yellow', 'green', 'yellow']); // Послідовність кольорів

  const handleClick = (id) => {
    setData((prevData) =>
      prevData.map((light) =>
        light.id === id ? { ...light, clickcount: light.clickcount + 1 } : light
      )
    );
  };

  const togglePower = (id) => {
    setData((prevData) =>
      prevData.map((light) =>
        light.id === id ? { ...light, power: !light.power } : light
      )
    );
  };

  const updateLightSettings = (id, key, value) => {
    setData((prevData) =>
      prevData.map((light) =>
        light.id === id ? { ...light, [key]: value } : light
      )
    );
  };

  // Automatic mode logic
  useEffect(() => {
    if (automaticMode) {
      const lightTiming = [3000, 1000, 3000, 1000]; // Час для кожного стану: червоний, жовтий, зелений, жовтий

      const interval = setInterval(() => {
        setCurrentLightIndex((prevIndex) => (prevIndex + 1) % lightSequence.length); // Зміна індексу світла
      }, lightTiming[currentLightIndex]);

      return () => clearInterval(interval);
    }
  }, [automaticMode, currentLightIndex, lightSequence]);

  // Оновлюємо кольори світлофорів відповідно до поточного індексу
  useEffect(() => {
    if (automaticMode) {
      setData((prevData) =>
        prevData.map((light) => ({
          ...light,
          power: light.color === lightSequence[currentLightIndex] // Увімкнено лише для поточного кольору
        }))
      );
    }
  }, [currentLightIndex, automaticMode, lightSequence]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <br />
          <Outlet />
        </>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: ':direction',
          element: (
            <TrafficLightsPage
              data={data}
              handleClick={handleClick}
              setOrientation={setOrientation}
              updateLightSettings={updateLightSettings}
              togglePower={togglePower}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <div className="root">
      <RouterProvider router={router} />
      <button onClick={() => setAutomaticMode(!automaticMode)}>
        {automaticMode ? 'Disable' : 'Enable'} Automatic Mode
      </button>
    </div>
  );
};

export default App;
