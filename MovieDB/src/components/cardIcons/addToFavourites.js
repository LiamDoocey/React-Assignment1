import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavouritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToFavourites = (e) => {
        e.preventDefault();
        const movieId = { id: movie.id };
        context.addToFavourites(movieId);
        console.log(movie.original_title + " added to favourites.");
    };

    return (
        <IconButton aria-label="add to favourites" onClick={handleAddToFavourites}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavouritesIcon;