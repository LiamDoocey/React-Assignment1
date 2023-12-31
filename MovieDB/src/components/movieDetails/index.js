import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MovieIcon from '@mui/icons-material/Movie';


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie, Availability, cast, trailer }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  let trailerKey = '';
if (trailer && trailer.results) {
    const trailerObj = trailer.results.find(result => result.type === 'Trailer');
    if (trailerObj) {
        trailerKey = trailerObj.key;
    }
}

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip label="Production Countries" sx={{...chip}} color="primary" />
        {movie.production_countries.map((c) => (
          <li key={c.name}>
            <Chip label={c.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip label="Where to watch - Ireland" icon={<ArrowDropDownIcon/>} sx={{...chip, backgroundColor: 'Orange', fontSize: '1.2em', padding: '10px', borderRadius: '5'}} />
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip label="Rent" sx={{...chip}} color="primary" />
        {Availability && Availability.results && Availability.results.IE && Availability.results.IE.rent ?
          Availability.results.IE.rent.map((r) => (
            <li key={r.provider_name}>
              <Chip label={r.provider_name} sx={{...chip}} />
            </li>
          ))
        : <Chip label="No data found..." sx={{...chip}} />}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip label="Buy" sx={{...chip}} color="primary" />
        {Availability && Availability.results && Availability.results.IE && Availability.results.IE.buy ? 
          Availability.results.IE.buy.map((b) => (
            <li key={b.provider_name}>
              <Chip label={b.provider_name} sx={{...chip}} />
            </li>
          ))
        : <Chip label="No data found..." sx={{...chip}} />}
      </Paper>

        {cast && cast.cast ? 
        cast.cast.map((c) => (
          <li key={c.name}>
            <Chip label={<><strong>{c.name}</strong> as "{c.character}"</>} sx={{...chip}} />
          </li>
        )) : <Chip label="No data found..." sx={{...chip}} />} 
        {trailerKey ?
          <div style={{position: 'absolute', top: '750px', right: '275px', width: '65%'}}>
            <iframe
              width="70%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              style={{position: 'absolute', top: '50%', left: '50%'}}
            /> 
          </div>
          :    
          <Typography variant="h6" color="textSecondary" align="center">
            <MovieIcon style={{ fontSize: 50 }} />
            <br />
            Trailer not found...
          </Typography>
        }
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;