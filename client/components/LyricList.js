import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const LyricList = props => {
  const onLike = id => {
    props.mutate({
      variables: {
        id
      }
    });
  };

  const renderLyrics = () => {
    return props.lyrics.map(({ id, content, likes }) => {
      return (
        <li className="collection-item" key={id}>
          {content}
          <div>
            <i className="material-icons" onClick={() => onLike(id)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  };

  return <ul>{renderLyrics()}</ul>;
};

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
