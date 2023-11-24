import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import { MoviesContext } from "../contexts/moviesContext";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import RemoveFromWatchlistIcon from "../components/cardIcons/removeFromWatchlist";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const UpcomingPage = () => {
    
    const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)
    const { watchlist } = useContext(MoviesContext);

    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    const upcomingMovies = data.results;

    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={upcomingMovies}
            action={(movie) => {
                const isInWatchlist = watchlist.find(m => m.id === movie.id);

                return isInWatchlist ? (
                    <RemoveFromWatchlistIcon movie={movie} />
                ) : (
                    <AddToWatchlistIcon movie={movie} />
                )
            }}
        />
    );
};

export default UpcomingPage;