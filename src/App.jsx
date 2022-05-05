import React, { useState, useEffect } from "react";
import "./App.css"
import { Route, Link, Switch } from 'react-router-dom';
import OrderForm from "./components/OrderForm";
import Home from "./components/Home"

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>We've got the meats!</p>
      <header>
        <img data-style="logo" src="./public/logo512.png" alt="React Logo" />
        <Link id="home" to="/">Home</Link>
        <Link id="order-pizza" to="/pizza">Pizza?</Link>
      </header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pizza">
          <OrderForm />
        </Route>
      </Switch>
    </>
  );
};

export default App;