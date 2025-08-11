import { useState, useEffect, useMemo } from "react";

import { formatISODate } from "../utils/date";
import { Link } from "react-router";
import "../styles.css";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { useViewContext } from "../hooks/ViewContextHook";
import type { Race } from "../Types/Race";
import { sortpinned } from "../utils/sort";

type RacesListProps = {
  races: Race[];
};


const STORAGE_KEY_PINNED = "pinnedRaces";

export default function RaceList({ races }: RacesListProps) {
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const { isList } = useViewContext();

  const save = (newPinned: Set<string>) => {
    localStorage.setItem(STORAGE_KEY_PINNED, JSON.stringify(Array.from(newPinned)));
  }

   useEffect(() => {
    try {
      const pinnedData = localStorage.getItem(STORAGE_KEY_PINNED);
      if (pinnedData) setPinned(new Set(JSON.parse(pinnedData)));
    } catch { 
      console.error("Failed");
    }
  }, []);

  const pin = (id: string) => {
    setPinned((prev) => {
      const newPinned = new Set(prev);
      newPinned.add(id);
      save(newPinned);
      return newPinned;
    });
  };

  const unpin = (id: string) => {
    setPinned((prev) => {
      const newPinned = new Set(prev);
      newPinned.delete(id);
      save(newPinned);
      return newPinned;
    });
  };

  
  const sorted = useMemo(() => {
      return sortpinned(races, pinned);
  }, [races, pinned]);

  return (
    <div className={`${isList ? "" : "grid"}`}>
      {sorted.map((race) => {
        const id = race.season + "-" + race.round;
        const isPinned = pinned.has(id);
        return (
          <div key={id} className={`card ${isList ? "space-between" : ""}`}>
            <div>
              <div className="f1-title">{race.raceName}</div>
              <div className="item-title">{race.Circuit.circuitName}</div>
              <div className="item-sub">{formatISODate(race.date)}</div>
              <div className="item-row">Round: {race.round}</div>
              <div className="item-row">Season: {race.season}</div>
            </div>

            <div>
              {/* by default outlined means unpinned */}
              {isPinned ? (
                <TiPin
                  className="icon"
                  onClick={() => unpin(id)}
                />
              ) : (
                <TiPinOutline
                  className="icon"
                  onClick={() => pin(id)}
                />
              )}
              <Link className="link" to={race.round}>
                <button className="btn btn-primary">Details</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
