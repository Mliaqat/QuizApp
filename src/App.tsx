import './App.css';
import LogIn from './Component/Auth/LogIn';
import { Route, Routes } from 'react-router-dom';
import Quiz from './Component/Quiz/Quiz';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
