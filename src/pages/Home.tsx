import React, { useEffect } from "react";
import SeasonsList from "../components/SeasonsList";
import { useState, useMemo } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Toggle from "../components/Toggle";
import "../styles.css";
import logoUrl from "../assets/logo.png";

type SeasonsResponse = {
  MRData: {
    total: string;
    limit: string;
    offset: string;
    SeasonTable: {
      Seasons: { season: string }[];
    };
  };
};

export default function Home() {
  const [seasons, setSeasons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSeasons, setTotalSeasons] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  const offset = useMemo(() => {
    return totalSeasons - currentPage * limit;
  }, [currentPage, limit, totalSeasons]);

  useEffect(() => {
    setLoading(true);
    const url = `https://api.jolpi.ca/ergast/f1/seasons?offset=${offset}&limit=${limit}`;

    axios.get<SeasonsResponse>(url).then((response) => {
      const data = response.data.MRData;
      setLoading(false);
      setSeasons(
        data.SeasonTable.Seasons.map((season) => season.season).sort(
          (a, b) => parseInt(b) - parseInt(a)
        )
      );
      setTotalSeasons(parseInt(data.total));
    });
  }, [offset, limit]);

  function goToNext() {
    if (currentPage * limit <= parseInt(totalSeasons.toString())) {
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
          <img
            src={logoUrl} //THIS IS A BETTER PRACTICE THAN USING A RELATIVE PATH IT IS MORE RELIABLE SPECIALLY IN THE ROUTES
            alt="F1"
            className="f1-logo"
          />
          <h1 className="f1-title">F1 Dashboard</h1>
        </div>
        <span className="f1-badge">Official Data</span>
      </header>
      <div className="container">
        <div className="row space-between">
          <div className="f1-subtitle"> Seasons</div>

          <Toggle />
        </div>
        {loading ? <div>Loading...</div> : <SeasonsList seasons={seasons} />}
        <Pagination
          goToNext={goToNext}
          goToPrev={goToPrev}
          hasNext={currentPage * limit <= parseInt(totalSeasons.toString())}
          hasPrev={currentPage > 1}
        />
      </div>
    </div>
  );
}
