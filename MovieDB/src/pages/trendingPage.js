import React from "react";
import { useQuery } from "react-query";
import { getTrendingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const TrendingMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery(
        "trending",
        getTrendingMovies
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    return(
        <MovieListPageTemplate
            title="Trending Movies"
            movies={movies}
            action={(movie) => {
                return <AddToFavouritesIcon movie={movie} />;
            }}
        />
    );
};

export default TrendingMoviesPage;