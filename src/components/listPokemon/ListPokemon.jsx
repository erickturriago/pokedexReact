// import { useEffect } from "react"
import { useEffect, useRef, useState } from 'react';
import CardPokemon from '../cardPokemon/CardPokemon'
// import Loader from '../loader/Loader'
import './ListPokemon.css'

const ListPokemon = ({buttonClicked}) => {

  

  const containerRef = useRef(null);
  // let loadMorePokemons = false;
  const [pokemons,setPokemons] = useState([]);
  const [lastButton,setLastButton] = useState('');
  const [lastPokemon,setLastPokemon] = useState(10);
  const [firstPokemon,setFirstPokemon] = useState(0);


  if(lastButton!=buttonClicked){
    setFirstPokemon(0);
    setLastPokemon(10);
    setLastButton(buttonClicked)
  }

  const fetchData = async ()=>{
    try {
      if(buttonClicked!=''){
        const response = await fetch('https://pokeapi.co/api/v2/type/'+buttonClicked);
        const pokemonFetch = await response.json();
        setPokemons([])
        setPokemons(pokemonFetch.pokemon);
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error al obtener los tipos de pokemones:', error);
      return [];
    }
  }

  useEffect(()=>{
    console.log("Fetch por lastpokemon")
    fetchData();
  },[buttonClicked])

  const handleScroll = (pokemonList)=>{
    const scrollPosition = pokemonList.scrollTop + pokemonList.clientHeight;
    const scrollThreshold = pokemonList.scrollHeight-1;


    if (scrollPosition >= scrollThreshold && lastButton==buttonClicked) {
        setLastPokemon(lastPokemon+10);
    }
  }

  return (
    <div ref={containerRef} className="pokemonList" onScroll={(e)=>setTimeout(() => {
      handleScroll(e.target);
    }, 100)}>
      { pokemons.slice(firstPokemon,lastPokemon).map((pokemon, index) => (
            <CardPokemon 
              key={index}
              pokemonName={pokemon.pokemon.name}
            >
            </CardPokemon>
        ))}
        {/* <CardPokemon></CardPokemon>
        <CardPokemon></CardPokemon>
        <CardPokemon></CardPokemon>
        <CardPokemon></CardPokemon> */}
    </div>
  )
}

export default ListPokemon