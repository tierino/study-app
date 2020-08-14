/* Authenticated users will see this component */

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUser } from "../actions";

import requireAuth from "./requireAuth";

function Home(props) {
  async function handleUsernameChange(e) {
    e.preventDefault();
    const newUsername = e.target[0].value;

    if (newUsername.trim().length > 0) {
      const response = await axios.post("/account/changeUsername", {
        newUsername,
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
      <p>Signed in as {props.user.username}</p>
      <a href="/auth/signout">
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
      <form onSubmit={handleUnfollow}>
        <p>Enter the username of the account to unfollow:</p>
        <input></input>
        <button>Unfollow</button>
      </form>
      <form onSubmit={createPost}>
        <p>Create a new post:</p>
        <input></input>
        <button>Post</button>
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
export default connect(mapStateToProps, { fetchUser })(requireAuth(Home));
