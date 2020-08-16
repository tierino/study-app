/* Authenticated users will see this component */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUser } from "../../actions";

import requireAuth from "../requireAuth";

function Home(props) {
  async function handleNameChange(e) {
    e.preventDefault();
    const newName = e.target[0].value;

    if (newName.trim().length > 0) {
      const response = await axios.post("/account/change_name", {
        newName,
      });
      console.log(response);
      props.fetchUser();
    }
  }

  async function handleAddUnit(e) {
    e.preventDefault();
    const unitName = e.target[0].value;

    if (unitName.trim().length > 0) {
      const response = await axios.post("/units/add", {
        name: unitName,
      });
      console.log(response);
      props.fetchUser();
    }
  }

  function renderUnits() {
    return props.user.units.map((unit) => {
      return <ul key={unit.name}>{unit.name}</ul>;
    });
  }

  return (
    <div>
      <p>Hello, {props.user.givenName}.</p>
      <a href="/auth/signout">
        <button>Sign out</button>
      </a>
      <form onSubmit={handleNameChange}>
        <p>Enter new name:</p>
        <input></input>
        <button>Change</button>
      </form>
      <form onSubmit={handleAddUnit}>
        <p>Add a unit:</p>
        <input></input>
        <button>Add</button>
      </form>
      <p>Your units:</p>
      {renderUnits()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

// Wrap in requireAuth HOC
export default connect(mapStateToProps, { fetchUser })(requireAuth(Home));
