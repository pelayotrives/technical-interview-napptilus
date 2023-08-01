import { useContext } from 'react';
import { Link } from "react-router-dom";
import { BasketContext } from "./BasketContext";
import napptilusLogo from "/logo-napptilus.png";

import "../styles/components/header.css";
import Breadcrumb from "./Breadcrumb";

export default function header() {
  const { basket } = useContext(BasketContext);
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
        <div className="second-column">
          <p>Items in basket: <span className='basket-elements'>{basket}</span></p>
        </div>
      </section>
    </>
  );
}
