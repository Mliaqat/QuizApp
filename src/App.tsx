import './App.css';
import LogIn from './Component/Auth/LogIn';
import { Route, Routes } from 'react-router-dom';
import Quiz from './Component/Quiz/Quiz';
import Admin from './Component/Admin/Admin';
import { AdminRoute, ProtectedRoute } from './Component/ProtectedRoutes/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/quiz" element={<ProtectedRoute Component={Quiz}/>}/>
        <Route path="/admin" element={<AdminRoute Component={Admin}/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
