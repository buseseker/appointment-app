import React from "react";
import { useState, useEffect } from "react";

const Header = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update the date every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const options = {
    timeZone: "Europe/Paris", // Time zone for Central European Time (CET)
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return (
    <div className="navbar">
      <div className="header">
        <h2>Home</h2>
      </div>

      <div className="date-info">
        <p>
          Today's Date: <i className="fa-solid fa-calendar-days fa-2xl"></i>
        </p>
        <h3>{currentDate.toLocaleDateString("en-US", options)}</h3>
      </div>
    </div>
  );
};

export default Header;
