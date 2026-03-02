import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { SetupScreen, SimulationScreen, ResultScreen } from './screens';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SetupScreen />} />
          <Route path="/sim" element={<SimulationScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
