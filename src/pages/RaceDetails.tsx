import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ResultList from "../components/ResultList";
import prettyMs from "pretty-ms";
import "../styles.css";
import logoUrl from "../assets/logo.png";
import PerformanceVisualization from "../components/PerformanceVisualization";

export type Driver = {
  givenName: string;
  familyName: string;
  nationality: string;
};

export type Result = {
  position: string;
  Driver: Driver;
  Constructor: {
    name: string;
  };
  status: string;
  Time?: {
    millis: string;
    time: string;
  };
};

type ResultsResponse = {
  MRData: {
    RaceTable: {
      Races: { Results: Result[] }[];
    };
  };
};

export default function RaceDetails() {
  const { season, round } = useParams<{ season: string; round: string }>();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = `https://api.jolpi.ca/ergast/f1/${season}/${round}/results`;
    axios.get<ResultsResponse>(url).then((response) => {
      const data = response.data.MRData.RaceTable.Races[0].Results;
      setLoading(false);

      setResults(
        data.map((result) => ({
          ...result,
          Time: result.Time
            ? {
                ...result.Time,
                time: prettyMs(Number(result.Time.millis)),
              }
            : undefined,
        }))
      );
    });
  }, [season, round]);

  return (
    <div>
      <header className="f1-header">
        <div className="f1-brand">
          <img src={logoUrl} alt="F1" className="f1-logo" />
          <h1 className="f1-title">F1 Dashboard</h1>
        </div>
        <span className="f1-badge">Official Data</span>
      </header>
      <div className="result-container">
        <div className="row space-between">

        <div className="f1-subtitle">Result List</div>

        </div>
        {loading ? <div>Loading...</div> : 
        <div className="grid">
          <ResultList results={results} />
          <div className="visualization">
            <PerformanceVisualization />
          </div>
        </div>
        }
      </div>
    </div>
  );
}
