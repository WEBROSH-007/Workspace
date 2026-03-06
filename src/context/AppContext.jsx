"use client";
import { createContext, useContext, useReducer, useCallback } from "react";

const AppContext = createContext(null);

const initialState = {
  user: null,
  bookings: [],
  isAuthLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_AUTH_LOADING":
      return { ...state, isAuthLoading: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload, isAuthLoading: false };
    case "LOGOUT":
      return { ...initialState };
    case "ADD_BOOKING":
      return { ...state, bookings: [action.payload, ...state.bookings] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((user) => dispatch({ type: "LOGIN", payload: user }), []);
  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);
  const setAuthLoading = useCallback((v) => dispatch({ type: "SET_AUTH_LOADING", payload: v }), []);
  const addBooking = useCallback((b) => dispatch({ type: "ADD_BOOKING", payload: b }), []);

  return (
    <AppContext.Provider value={{ ...state, login, logout, setAuthLoading, addBooking }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
