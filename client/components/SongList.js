import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";
import query from "../queries/fetchSongs";
import LyricCreate from "./LyricCreate";
class SongList extends Component {
  deleteSong(id) {
    this.props
      .mutate({
        variables: {
          id
        }
      })
      .then(x => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li key={song.id} className="collection-item">
          <Link to={`/song/${song.id}`}>{song.title}</Link>

          <i
            className="material-icons"
            onClick={() => this.deleteSong(song.id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <p>Loading..</p>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="song/new" className="btn-floating btn-large red right">
          add
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
