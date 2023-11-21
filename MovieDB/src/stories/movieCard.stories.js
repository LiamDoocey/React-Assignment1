import React from "react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";

export default {
    title: "Home Page/MovieCard",
    component: MovieCard,
};

export const Basic = () => {
    return (
        <MovieCard 
            movie = {SampleMovie} 
        />
    );
};
Basic.storyName = "Default";

export const Exception = () => {
    const sampleNoPoster = { ...SampleMovie, poster_path: undefined };
    return (
        <MovieCard movie = {sampleNoPoster} />
    );
};
Exception.storyName = "exception";