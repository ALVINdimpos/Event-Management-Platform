import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindEventPage from "./pages/FindEvent";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="events" element={<FindEventPage />} />
        <Route path="*" element={<NoPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);