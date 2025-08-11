import "../styles.css";
import { useViewContext } from "../hooks/ViewContextHook";

export default function Toggle() {
    // Access the context to get the current view state and functions
    // isList: boolean, listView: function, gridView: function
    const {isList, listView, gridView} = useViewContext();
   
  return (
    <div className="toggle">
      <button className="toggle button" aria-active={isList} onClick={listView}>List</button>
      <button className="toggle button" aria-active={!isList} onClick={gridView}>Grid</button>
    </div>
  );
}
