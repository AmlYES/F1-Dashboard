import type { Race } from "../Types/Race"


export const sortpinned = (races: Race[], pinned: Set<string>)=>{
         return races.sort((a) => 
        pinned.has(a.season + "-" + a.round) ? -1 : 1
      )
  }