import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

import App from "@layouts/App/App";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "사이트 주소"
    : "http://localhost:3090";

const queryClient = new QueryClient();

render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>,
  document.querySelector("#app")
);
