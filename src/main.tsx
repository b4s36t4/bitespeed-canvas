import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";

import {
  MantineColorsTuple,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

const myColor: MantineColorsTuple = [
  "#ffeeee",
  "#f5dddd",
  "#e3b9b9",
  "#d19292",
  "#c37271",
  "#ba5d5c",
  "#b75252",
  "#a14243",
  "#91393a",
  "#802e30",
];

const theme = createTheme({
  colors: {
    myColor,
  },
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <NavigationProgress />
      <QueryClientProvider client={client}>
        <App />
        <Toaster />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
);
