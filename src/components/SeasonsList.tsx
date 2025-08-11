import React from "react";
import { Link } from "react-router";
import "../styles.css";
import { useViewContext } from "../hooks/ViewContextHook";

type SeasonsListProps = {
  seasons: string[];
};

export default function SeasonsList({ seasons }: SeasonsListProps) {

  // Use the context to determine if the view is list or grid
  const { isList } = useViewContext();

  return (
    <div className={`${isList ? "" : "grid"}`}>
      {seasons.map((season, index) => (
          <Link to={`/${season}/races`} className="link">
            <div key={index} className={`card ${isList ? "" : "season-center"}`}>
              <span className="link-text">Season: {season}</span>
            </div>
          </Link>
      ))}
    </div>
  );
}
