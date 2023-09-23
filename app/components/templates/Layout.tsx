import React from "react";
import { NavBar } from "./nav-bar";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
