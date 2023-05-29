import { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import './CardPokemon.css'
import statColors from '../../statColors';
import typeColor from '../../typeColor';

const CardPokemon = ({pokemonName}) => {


  const [pokemon,setPokemon] = useState(null);
  const [loader,setLoader] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    
    const fetchData = async ()=>{
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName);
        const pokemonFetch = await response.json();
        setPokemon(pokemonFetch);
        setLoader(true)
        // console.log(pokemonFetch)
        // console.log('pidiendo')
      } catch (error) {
        console.error('Error al obtener los tipos de pokemones:', error);
        return [];
      }
      
    }
    fetchData();
  },[pokemonName])

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);
  // console.log("Pokemon name: "+pokemonName)
  // console.log(pokemon);
  return (
    <div className='pokemonCard'>
        {loader&&<Loader></Loader>}
        {pokemon&& 
          <>
            <div className='pokemonInfo'>
              <p>{pokemon.name}</p>
              <img src={pokemon.sprites.front_default} 
                onLoad={()=>{
                  setTimeout(() => {
                    setLoader(false);
                  }, 600);
                }} 
                alt="" 
                style={{
                  opacity:loader?0:1,
                  zIndex:loader?-1:1
                }}
              />
              <div className="pokemonType">
                  {pokemon.types.map((type,index)=>(
                    <span 
                      key={index} 
                      className="idPokedex"
                      style={{
                        backgroundColor:typeColor[type.type.name]
                      }}
      
                    >
                    {type.type.name}
                    </span>
                  ))}
              </div>
            </div>
            <div className='pokemonStats'>
              <table>
                <tbody>
                  {pokemon.stats.map((stat,index)=>(
                    <tr className='statRow' key={index}>
                      <td><strong>{stat.stat.name}</strong></td>
                      <td><strong className="statPoints">{stat.base_stat}</strong></td>
                      <td><div className="statBar">
                            <div className={mounted?'statBarFill':'statBarV'}
                              style={{
                                backgroundColor:statColors[stat.stat.name].color,
                                maxWidth:mounted?((100/statColors[stat.stat.name].max)*stat.base_stat+"px"):'0px',
                                transition: mounted ? 'max-width 0.5s ease-in-out' : 'none'
                              }}>                    
                            </div>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        }
    </div>
  )
}

export default CardPokemon