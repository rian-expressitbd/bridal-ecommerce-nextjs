// src/providers/AppProviders.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store";
import { ThemeProvider } from "./ThemeProvider";

const store = makeStore();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};
