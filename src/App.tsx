import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from './main/MainContextProvider';
import ToDoListComponent from './pages/TaskPage';
import UserRegister from './pages/UserRegister';
import LoginPage from './pages/LoginPage';

export default function App() {
  const { userIsLogged } = useContext(MainContext);

  return (
    <>
    <Router>
      <Routes>
      <>
          {userIsLogged ? (
            <>
            <Route path="/todo-list" element={<ToDoListComponent />} />
            </>
          ) : (
            <>
              {/* <Route path="/todo-list" element={<ToDoListComponent />} />  */}
              <Route path="/cadastrar" element={<UserRegister />} />
              <Route path="/" element={<LoginPage />} />
            </>
          )}
        </>
      </Routes>
    </Router>
    </>
  );
}
