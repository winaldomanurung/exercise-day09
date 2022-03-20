import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// components
import Navbar from "./components/navbar";
import Navigation from "./components/navigation";

// pages
import ShowTables from "./pages/show-table";
import ShowForm from "./pages/ShowForm";

function Main() {
  const [sortBy, setSortBy] = useState("");
  const sortHandlerFn = (event) => {
    setSortBy(event.target.value);
  };
  return (
    <div>
      <Navbar />
      <Navigation sortHandler={sortHandlerFn} />
      <Routes>
        <Route path="/" element={<ShowForm />} />
        <Route path="/table" element={<ShowTables sortBy={sortBy} />} />
      </Routes>
    </div>
  );
}

export default Main;
