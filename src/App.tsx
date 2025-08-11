import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Races from "./pages/Races";
import RaceDetails from "./pages/RaceDetails";
import "./styles.css"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:season/races/" element={<Races/>}/>
      <Route path="/:season/races/:round" element={<RaceDetails/>} />
    </Routes>
  );
}