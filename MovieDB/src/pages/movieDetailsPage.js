import React from "react";
import { useParams } from 'react-router-dom';
import { getMovie, getWatchAvailability } from '../api/tmdb-api';
import { useQuery } from "react-query";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import Spinner from '../components/spinner'

const MoviePage = () => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );
  const { data: Avail } = useQuery(
    ["watch", { id: id }],
    getWatchAvailability
  );

  if (Avail) {
    if (!Avail || !Avail.results) {
      console.log("No Streaming data available");
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} Availability={Avail}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;