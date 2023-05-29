// import { useState } from 'react';
import './TypeButton.css'
import typeColor from '../../typeColor';

const TypeButton = ({name,setButtonClicked,buttonClicked}) => {

  const styles = {
        color : typeColor[name],
        backgroundColor: '#f4f4f4'
      };
    
    const stylesClick ={
        backgroundColor : typeColor[name],
        color:'#fff'
    }
    
  return (
    <button 
        className="typeButton"
        style={buttonClicked==name?stylesClick:styles}
        onClick={(event)=>{setButtonClicked(event.target.textContent)}}   
    >{name}</button>
  )
}

export default TypeButton