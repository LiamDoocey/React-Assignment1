import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonMovie({alignment, handleAlignment}){
       return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        style={{position: "relative"  ,left: "65px", top: "735px", backgroundColor: 'white'}}
      >
        <ToggleButton value="Discover" aria-label="discover" style={{
          backgroundColor: alignment === 'Discover' ? 'rgb(204, 204, 0)' : '#807b7a',
          color: 'black',
          fontWeight: 'bold',
        }}>
        Discover
        </ToggleButton>
        <ToggleButton value="Latest" aria-label="latest" style={{
          backgroundColor: alignment === 'Latest' ? 'rgb(204, 204, 0)' : '#807b7a', 
          color: 'black',
          fontWeight: 'bold'
          }}>
          Latest
        </ToggleButton>
      </ToggleButtonGroup>
    );
}