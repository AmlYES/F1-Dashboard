import React, { createContext, useState }from 'react'


const STORAGE_KEY = "toggleView";

type ViewContextValue = {
  isList: boolean;
  listView: () => void;
  gridView: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ViewContext = createContext<ViewContextValue | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
 const [isList, setIsList] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : true; // default: list
    } catch {
      return true;
    }
  });

   const save = (view: boolean) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(view));
    }


  const value: ViewContextValue = {
    isList,
    listView: () => {
        if (isList) return;
        setIsList(true);
        save(true);
    },
    gridView: () => {
        if (!isList) return;
        setIsList(false);
        save(false);
    }
  };



  return (
   <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
  )
}

