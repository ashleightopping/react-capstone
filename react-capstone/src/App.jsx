import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext"; 
import AddEvent from "./components/AddEvent";
import Register from "./components/CreateAccount";
import DisplayEvents from "./components/Events";
import HelpPage from "./components/Help";
import LoginPage from "./components/Login";
import NavBar from "./routes/NavBar";
import './App.css';

// Wrapper for protected routes
const ProtectedRoute = ({ element }) => {
  const { loggedIn } = useAppContext();
  return loggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        {/* NavBar is always visible */}
        <NavBar /> 
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Protected routes - need to be logged in */}
          <Route path="/events" element={<ProtectedRoute element={<DisplayEvents />} />} />
          <Route path="/addevent" element={<ProtectedRoute element={<AddEvent />} />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;