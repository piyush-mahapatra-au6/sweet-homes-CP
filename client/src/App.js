import React from "react";
import Layout from "./components/core/Layout";
import "./css/App.css";
import { Route, Switch, NavLink, Link } from "react-router-dom";

//importing hero and banner
import Hero from "./components/landing/Hero";
import Banner from "./components/landing/Banner";
import Services from "./components/landing/Services";
import FeaturedRooms from "./components/landing/FeaturedRooms";
import Statistics from "./components/landing/Statistics";
import Testimonial from "./components/landing/Testimonial";
import Founder from "./components/landing/Founder";
import Slider from "./components/landing/Slider";




const App = () => {
  return (
    <Layout>
      <Slider autoPlay={3} />
      <Services />
      <FeaturedRooms />
      <Statistics />
      <Founder />
      <Testimonial />
    </Layout>
  );
};

export default App;
