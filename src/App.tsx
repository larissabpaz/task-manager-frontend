import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ToDoListComponent from './pages/TaskPage';
import UserRegister from './pages/UserRegister';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import { MainContext } from './main/MainContextProvider';

export default function App() {
  const userIsLogged = useContext(MainContext); 

  return (
    <>
    <Router>
      <Routes>
      <>
            <Route path="/todo-list" element={userIsLogged ? <ToDoListComponent /> : <Navigate to="/"/>} />
              <Route path="/cadastrar" element={<UserRegister />} />
              <Route path="/" element={<LoginPage />} />
        </>
      </Routes>
    </Router>
    </>
  );
}
