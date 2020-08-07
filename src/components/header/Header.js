import React from "react";
import "./header.scss";
import moment from "moment";
const Header = () => {
  const dateToday = moment().format("DD/MM/YYYY");
  return (
    <div className="container-header">
      <div className="container-header-left">
        <h1>Cosas Por Hacer</h1>
      </div>

      <div className="container-header-right">
        <span>Hoy:</span> {dateToday}
      </div>
    </div>
  );
};

export default Header;
