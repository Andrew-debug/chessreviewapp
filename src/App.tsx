import { useState } from "react";
import { IPgn } from "./types/index.js";
//
import GamesHisory from "./components/GamesHisory";
import MainContent from "./components/MainContent.js";

function App() {
  const [currentPgn, setcurrentPgn] = useState<IPgn>();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <GamesHisory setcurrentPgn={setcurrentPgn} />
      <MainContent currentPgn={currentPgn!} />
    </div>
  );
}

export default App;
