import React from "react";
import { getMovies, getLatestMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddtoFavouritesIcon from '../components/cardIcons/addToFavourites';
import ToggleButtonMovie from "../components/toggleButtonMovie";
import Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import popcornErrorImage from '../images/Popcorns-error.svg';



const HomePage = () => {
  const {  data: movies, isLoading: isLoadingMovies }  = useQuery('discover', getMovies);
  const {  data: latest, isLoading: isLoadingLatest }  = useQuery('movie', getLatestMovies);
  const [alignment, setAlignment] = React.useState('Discover');

  

  if (isLoadingMovies || isLoadingLatest) {
    return <Spinner />
  }

  const handleAlignment = (e, newAlignment) => {
    if (newAlignment !== null) {
        setAlignment(newAlignment);
        console.log(newAlignment)
    }
  }; 

  let data = [];
  if (alignment === 'Discover') {
    data = movies?.results || [];
  }
  else {
    data = latest?.results || [];
  }

  return (
    <>
      <ToggleButtonMovie alignment={alignment} handleAlignment={handleAlignment}/>
      <PageTemplate
        title={alignment + ' Movies'}
        movies={data.length > 0 ? data : []}
        action={(movie) => {
          return <AddtoFavouritesIcon movie={movie} />
        }}
      />
      {data.length === 0 && 
          <>
            <Snackbar 
              open={true} 
              autoHideDuration={50}
              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
              style={{fontSize: '5em', top: '50px'}}>
                <Alert severity="error">
                    There has been an issue with this endpoint
                </Alert>
            </Snackbar>
            <h1 style={{
              position: 'absolute',
              top: '50%',
              opacity: '1',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              fontFamily: 'Roboto, sans-serif'}}>
                Oops! something went wrong....
            </h1>
            <img src={popcornErrorImage} 
            alt="POPCORN-ERROR" 
            style={{position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)', opacity: '0.5', zIndex: 1}}
            />
          </>
        }
    </>
  );
};
export default HomePage;