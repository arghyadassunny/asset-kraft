import Admin from './pages/Admin';
import Disclosures from './pages/Disclosures';
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OurTeamPage from "./pages/OurTeamPage";
import { Toaster } from "./components/ui/sonner";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/our-team" element={<OurTeamPage />} />
          <Route path="/disclosures" element={<Disclosures />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
