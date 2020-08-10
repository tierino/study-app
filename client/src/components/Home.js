/* Authenticated users will see this component */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import requireAuth from "./requireAuth";

function Home(props) {
  async function handleUsernameChange(e) {
    e.preventDefault();
    const newUsername = e.target[0].value;

    if (newUsername.trim().length > 0) {
      const response = await axios.post("/settings/changeUsername", {
        newUsername,
      });
      console.log(response);
    }
  }

  async function handleFollow(e) {
    e.preventDefault();
    const followedUsername = e.target[0].value;

    if (followedUsername.trim().length > 0) {
      const response = await axios.post("/follows/new", {
        followedUsername,
      });
      console.log(response);
    }
  }

  function renderFollowing() {
    if (props.user.following) {
      return props.user.following.map((account) => {
        return <ul key={account.id}>{account.username}</ul>;
      });
    }
  }

  function renderFollowers() {
    if (props.user.followers) {
      return props.user.followers.map((account) => {
        return <ul key={account.id}>{account.username}</ul>;
      });
    }
  }

  return (
    <div>
      <p>Hi, you are signed in :)</p>
      <a href="/api/signout">
        <button>Sign out</button>
      </a>
      <form onSubmit={handleUsernameChange}>
        <p>Enter new username:</p>
        <input></input>
        <button>Change</button>
      </form>
      <form onSubmit={handleFollow}>
        <p>Enter the username of the account to follow:</p>
        <input></input>
        <button>Follow</button>
      </form>
      <p>Following:</p>
      {renderFollowing()}
      <p>Followers:</p>
      {renderFollowers()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

// Wrap in requireAuth HOC
export default connect(mapStateToProps)(requireAuth(Home));
