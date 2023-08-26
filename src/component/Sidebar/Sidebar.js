import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar-menu">
      <div className="profile">
        <h2>
          <i className="fa-solid fa-circle-user fa-2xl"></i> Patient
        </h2>
        <p>patient@gmail.com</p>
        <button className="btn logout">Log Out</button>
      </div>

      <div className="menu-items">
        <ul>
          <a href="#">
            {" "}
            <li>
              <i className="fa-solid fa-house"></i> Home
            </li>
          </a>
          <a href="#">
            {" "}
            <li>
              <i className="fa-solid fa-calendar-check"></i> My Appointments
            </li>
          </a>
          <a href="#">
            <li>
              <i className="fa-solid fa-gear"></i> Settings
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
