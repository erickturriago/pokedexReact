// import { useState } from 'react'
import TypePokemons from './components/typePokemons/TypePokemons'
import ListPokemon from './components/listPokemon/ListPokemon'
import './App.css'
import { useState } from 'react'

function App() {
  // const [count, setCount] = useState(0)

  const [buttonClicked,setButtonClicked] = useState('');

  console.log(buttonClicked)

  return (
    <div className='home'>
      <TypePokemons setButtonClicked={setButtonClicked} buttonClicked={buttonClicked}></TypePokemons>
      <ListPokemon buttonClicked={buttonClicked}></ListPokemon>
    </div>
  )
}

export default App
