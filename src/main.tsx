import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./App";

const initialize = async () => {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
  return Promise.resolve();
};

initialize().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>
  );
});
