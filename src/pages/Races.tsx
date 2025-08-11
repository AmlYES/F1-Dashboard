import { useParams } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import RaceList from "../components/RaceList";
import Pagination from "../components/Pagination";
import Toggle from "../components/Toggle";
import "../styles.css";
import logoUrl from "../assets/logo.png";
import type { Race } from "../Types/Race";


type RacesResponse = {
  MRData: {
    total: string;
    limit: string;
    offset: string;
    RaceTable: {
      Races: Race[];
    };
  };
};

export default function Races() {
  const { season } = useParams<{ season: string }>();
  const [races, setRaces] = useState<Race[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRaces, setTotalRaces] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  const offset = useMemo(() => {
    return (currentPage - 1) * limit;
  }, [currentPage, limit]);

  useEffect(() => {
    setLoading(true);
    const url = `https://api.jolpi.ca/ergast/f1/${season}/races?offset=${offset}&limit=${limit}`;

    axios.get<RacesResponse>(url).then((response) => {
      const data = response.data.MRData;
      setLoading(false);
      setRaces(data.RaceTable.Races);
      setTotalRaces(parseInt(data.total));
    });
  }, [offset, limit, season]);

  function goToNext() {
    if (currentPage * limit <= parseInt(totalRaces.toString())) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  }
  function goToPrev() {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  }

  return (
    <div>
      <header className="f1-header">
        <div className="f1-brand">
          <img src={logoUrl} alt="F1" className="f1-logo" />
          <h1 className="f1-title">F1 Dashboard</h1>
        </div>
        <span className="f1-badge">Official Data</span>
      </header>
      <div className="container">
        <div className="row space-between">

        <div className="f1-subtitle">Races for season {season}</div>
          <Toggle/>
        </div>
        {loading ? <div>Loading...</div> : <RaceList races={races} />}
        <Pagination
          goToNext={goToNext}
          goToPrev={goToPrev}
          hasNext={currentPage * limit <= parseInt(totalRaces.toString())}
          hasPrev={currentPage > 1}
        />
      </div>
    </div>
  );
}
