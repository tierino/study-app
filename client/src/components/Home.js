/* Authenticated users will see this component */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUser } from "../actions";

import requireAuth from "./requireAuth";

function Home(props) {
  async function handleNameChange(e) {
    e.preventDefault();
    const newName = e.target[0].value;

    if (newName.trim().length > 0) {
      const response = await axios.post("/account/changeName", {
        newName,
      });
      console.log(response);
      props.fetchUser();
    }
  }

  async function handleFollow(e) {
    e.preventDefault();
    const followedUsername = e.target[0].value;

    if (followedUsername.trim().length > 0) {
      const response = await axios.post("/follows/add", {
        followedUsername,
      });
      console.log(response);
      props.fetchUser();
    }
  }

  async function handleUnfollow(e) {
    e.preventDefault();
    const unfollowedUsername = e.target[0].value;

    if (unfollowedUsername.trim().length > 0) {
      const response = await axios.post("/follows/remove", {
        unfollowedUsername,
      });
      console.log(response);
      props.fetchUser();
    }
  }

  async function createPost(e) {
    e.preventDefault();
    const content = e.target[0].value;

    if (content.trim().length > 0) {
      const response = await axios.post("/posts/create", {
        content,
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
      <p>Hello, {props.user.givenName}.</p>
      <a href="/auth/signout">
        <button>Sign out</button>
      </a>
      <form onSubmit={handleNameChange}>
        <p>Enter new name:</p>
        <input></input>
        <button>Change</button>
      </form>
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
