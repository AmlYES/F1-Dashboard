import React from "react";
import type { Result } from "../pages/RaceDetails";
import "../styles.css";

type ResultListProps = {
  results: Result[];
};

export default function ResultList({ results }: ResultListProps) {
  return (
    <div>
      {results.map((result, index) => (
        <div key={index} className="card row space-between">
          <div>
            <div className="f1-title">
              Name: {result.Driver.givenName} {result.Driver.familyName}
            </div>
            <div className="item-title">
              Nationality: {result.Driver.nationality}
            </div>
            <div className="item-sub">Position: {result.position}</div>
            <div className="item-row">Team: {result.Constructor.name}</div>
          </div>
          <div>
            <div className="item-title">
            Status: {result.status}
            </div>
            Time: {result.Time ? result.Time.time : "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
}
