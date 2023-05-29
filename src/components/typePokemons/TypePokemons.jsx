import { useEffect, useState } from "react"
import './TypePokemons.css';
import TypeButton from "../typeButton/TypeButton";


const TypePokemons = ({setButtonClicked,buttonClicked}) => {
  const [typePokemons,setTypePokemons] = useState([]);

  useEffect(()=>{
    console.log("test")
    const fetchData = async ()=>{
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const typesPokemonsFetch = await response.json();
        setTypePokemons(typesPokemonsFetch.results)
      } catch (error) {
        console.error('Error al obtener los tipos de pokemones:', error);
        return [];
      }
      
    }
    fetchData();
  },[])

  // console.log(typeClicked)
  return (
    <div className="typePokemons">
        { typePokemons.map((type, index) => (
            <TypeButton 
              key={index}  
              name={type.name}
              setButtonClicked={setButtonClicked}
              buttonClicked={buttonClicked}
              className=""  
            >
              Button
            </TypeButton>
        ))}
    </div>
  )
}

export default TypePokemons