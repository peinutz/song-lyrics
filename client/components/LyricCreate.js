import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const LyricCreate = props => {
  const [formValues, setContent] = useState({ content: "" });
  const handleChange = event => setContent({ content: event.target.value });
  const onSubmit = event => {
    event.preventDefault();
    props
      .mutate({
        variables: {
          content: formValues.content,
          songId: props.songId
        }
      })
      .then(setContent({ content: "" }));
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Add Lyric</label>
      <input value={formValues.content} onChange={handleChange} />
    </form>
  );
};

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(mutation)(LyricCreate);
