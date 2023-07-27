import React from "react";
import { Link } from "react-router-dom";
import napptilusLogo from "/logo-napptilus.png";

import "../styles/components/header.css";
import Breadcrumb from "./Breadcrumb";

export default function header() {
  return (
    <>
      <section className="header">
        <div className="first-column">
          <Link to="/">
            <img
              className="first-column-logo"
              src={napptilusLogo}
              alt="Napptilus Logo"
            />
          </Link>
          <Breadcrumb />
        </div>
        <nav className="second-column"></nav>
      </section>
    </>
  );
}
