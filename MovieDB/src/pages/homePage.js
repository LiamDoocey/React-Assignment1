import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddtoFavouritesIcon from '../components/cardIcons/addToFavourites';


const HomePage = () => {

  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      action={(movie) => {
        return <AddtoFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default HomePage;