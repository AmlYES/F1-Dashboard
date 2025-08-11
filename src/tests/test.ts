import { sortpinned } from '../utils/sort';

import { formatISODate } from '../utils/date';
import type { Race } from '../Types/Race';


describe('formatISODate', () => {
  it('formats date as YYYY-MM-DD', () => {
    expect(formatISODate('2024-11-24')).toBe("November 24, 2024");
  });
});

describe('sortpinned', () => {
  it('sorts pinned races to the front', () => {
   const mockRaces: Race[] = [
  {
    raceName: "Australian Grand Prix",
    Circuit: { circuitName: "Albert Park Circuit" },
    date: "2025-03-16",
    round: "1",
    season: "2025",
  },
  {
    raceName: "Bahrain Grand Prix",
    Circuit: { circuitName: "Bahrain International Circuit" },
    date: "2025-03-23",
    round: "2",
    season: "2025",
  },
  {
    raceName: "Monaco Grand Prix",
    Circuit: { circuitName: "Circuit de Monaco" },
    date: "2025-05-25",
    round: "7",
    season: "2025",
  },
];
    const pinned = new Set(['2025-7', '2025-2']);
    const sorted = sortpinned([...mockRaces], pinned);
    expect(sorted[0].raceName).toBe('Monaco Grand Prix');
    expect(sorted[1].raceName).toBe('Bahrain Grand Prix');
    expect(sorted[2].raceName).toBe('Australian Grand Prix');
  });

it('returns original order if no races are pinned', () => {
    const races: Race[] = [
     {
    raceName: "Australian Grand Prix",
    Circuit: { circuitName: "Albert Park Circuit" },
    date: "2025-03-16",
    round: "1",
    season: "2025",
  },
  {
    raceName: "Bahrain Grand Prix",
    Circuit: { circuitName: "Bahrain International Circuit" },
    date: "2025-03-23",
    round: "2",
    season: "2025",
  },
    ];
    const pinned = new Set<string>();
    const sorted = sortpinned([...races], pinned);
    expect(sorted[0].raceName).toBe('Australian Grand Prix');
    expect(sorted[1].raceName).toBe('Bahrain Grand Prix');
  });

  
});
