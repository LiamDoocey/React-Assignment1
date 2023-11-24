import React, { useContext } from "react";
import { useQuery } from "react-query";
import { MoviesContext } from "../../contexts/moviesContext";
import { getCurrentlyInCinema } from "../../api/tmdb-api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import Avatar from "@mui/material/Avatar";
import Spinner from '../spinner';
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";

export default function MovieCard({movie, action}) {

    const { data, isLoading } = useQuery('now_playing', getCurrentlyInCinema)

    const { favourites } = useContext(MoviesContext);
    const { watchlist } = useContext(MoviesContext);

    if (isLoading) {
        return <Spinner/>
    }
    
    const inCinema = data.results;
   
    const checkIdExists = (array, id) => {
        if(array && array.length > 0){
            const exists = array.find((item) => {
                return item.id === id;
            })
            return exists;
        }
        else {
            return false;
        }
    }

    const updatedMovie = {
        ...movie,
        favourite: checkIdExists(favourites, movie.id),
        watchlist: checkIdExists(watchlist, movie.id),
        inCinema: checkIdExists(inCinema, movie.id)
    }

    

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar = {
                    updatedMovie.favourite ? (
                        <Avatar sx = {{ backgroundColor: "red" }}>
                            <FavoriteIcon />
                        </Avatar>
                    ) : null
                }
                action = {
                    updatedMovie.watchlist ? (
                        <Avatar sx = {{ backgroundColor: "green" }}>
                            <PlaylistAddCheckIcon />
                        </Avatar>
                    ) : null
                    }
                title = {
                    <Typography variant = "h5" component = "p">
                        {updatedMovie.title}{" "}
                    </Typography>
                }
            />
            <CardMedia
                sx = {{ height: 500 }}
                image = {
                    updatedMovie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${updatedMovie.poster_path}`
                        : img
                }
                />

            <CardContent>
                <Grid container >
                    <Grid item xs = {6}>
                        <Typography variant = "h6" component= "p">
                            <CalendarIcon fontSize = "small" />
                            {updatedMovie.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs = {6}>
                        <Typography variant = "h6" component= "p">
                            <StarRateIcon fontSize = "small" />
                            {" "}{updatedMovie.vote_average}{" "}
                        </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                        {updatedMovie.inCinema ? (
                            <Chip label = "In Cinema" sx = {{ backgroundColor: "#55d9bc", fontSize: "1.2em", padding: "10px", borderRadius: "5" }} />
                        ) : null}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                {action(updatedMovie)}
            <Link to = {`/movies/${updatedMovie.id}`}>
                <Button variant = "outlined" size = "medium" color = "primary">
                    More Info....
                </Button>    
            </Link>
            </CardActions>
        </Card>
    );
}