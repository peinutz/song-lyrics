import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import { hashHistory } from "react-router";
import query from "../queries/fetchSongs";
import LyricCreate from "./LyricCreate";

const SongCreate = function(props) {
  const [formValues, setValues] = useState({ title: "" });

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({
      ...formValues,
      [name]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    props
      .mutate({
        variables: {
          title: formValues.title
        },
        refetchQueries: [{ query: query }]
      })
      .then(hashHistory.push("/"));
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create new song</h3>
      <form onSubmit={onSubmit}>
        <label>Song Title:</label>
        <input
          onChange={event => handleChange(event)}
          value={formValues.title}
          name="title"
        />
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
