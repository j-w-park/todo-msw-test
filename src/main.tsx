import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { App } from "./App";

const initialize = async () => {
  // 개발 환경에서만 MSW가 활성화 되도록 함
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser"); // 동적 임포트
    return worker.start();
  }
  return Promise.resolve();
};

initialize().then(() => {
  const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
