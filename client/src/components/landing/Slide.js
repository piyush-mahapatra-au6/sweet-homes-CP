/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import Banner from "../landing/Banner";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import '../../css/Banner.css'
const Slide = ({ content }) => {
  return (
    <div
      css={css`
      height: 50;
      width: 50%;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
    >
      <div className="Banner">
        
        <Banner 
          title="SWEET HOMES"
          subtitle="Nice and Easy Homes for all Budgets"
        >
          <Link to="/rooms" className="btn-primary">
            Browse Homes
          </Link>
        </Banner>
      </div>
    </div>
  );
};

export default Slide;
