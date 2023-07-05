import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { stockfishInterface } from "./stockfish.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App stockfishInterface={stockfishInterface} />
  </React.StrictMode>
);
