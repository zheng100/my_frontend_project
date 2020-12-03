import './App.css';
import React , {useState, useEffect,useRef } from "react";
import Cluster from './components/Cluster';
import ModAvatar from './components/ModAvatar';
import avatarData from './data';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToggleGroup from './components/Buttons';
import PokeStyleFusion from './components/PokeStyleFusion';
import DragdropAva from './components/DragdropAva';
import {saveSvgAsPng} from 'save-svg-as-png';

import Header from './statics/Header';
import Footer from './statics/Footer';


// Data source 1 for style data 2 for initial avatar data

const initava = avatarData('init')
const datafromBackend = avatarData('style')
// Color for DRAGBALES
const skinColorSet = avatarData('skinColor');
const hairColorSet = avatarData('hairColor');
const clothColorSet = avatarData('clotheColor');

// main app
function App() {
  // state that holds current avatar look
  // console.log(skinColorSet);
  const [avaDetails, setavaDetails] = useState(initava);
  const [colorDisplay, setcolorDisplay] = useState("");
  
  // console.log(avaDetails);
  // useEffect(() =>{
  //   console.log("details Changed")
  // },[avaDetails])

  
  function saveImage(){
    saveSvgAsPng(document.getElementById("my_ava").childNodes[0], "avatar.png")
  }

  function resetAvatar(){
    const newDetails = avatarData('init');
    setavaDetails(newDetails);
  }

  function randomAvatar(){
    const newDetails = RandomProp(datafromBackend);
    setavaDetails(newDetails);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function RandomProp(obj){
      let keys = Object.keys(obj);
      const randomProp = {};
      keys.forEach((key) => {
        const lstLength = obj[key].length;
        const index = getRandomInt(lstLength);
        randomProp[key] = obj[key][index];
      })
      return randomProp;
  }
  
  return (  
  <div className="container-fluid">

    <Header/>
    <h2> Step 1: Let's Create Your Avatar Interactively!</h2>
    
    <div class="form-group row">
      <div className= 'col-md-4'>
        <button className="btn btn-primary btn-lg" onClick = {resetAvatar}>
          Reset Avatar
        </button>
      </div>
      <div className= 'col-md-4'>
        <button className="btn btn-primary btn-lg" onClick = {randomAvatar}>
          Random Avatar
        </button>
      </div>
    </div>

    <DragdropAva avaDetails = {avaDetails} datafromBackend = {datafromBackend} skinColorSet = {skinColorSet} hairColorSet = {hairColorSet} clothColorSet = {clothColorSet} setcolorDisplay = {setcolorDisplay} avaChangeFun = {setavaDetails}/>
        
    {/* avatar save button */}
    <div class="col-12-text-center" id = 'Avatar_save'>
      <button type="button" class="btn btn-primary btn-lg" onClick = {saveImage} id = 'save_button'>
        Save Image
      </button>
    </div>
    
    {/* Step 3 & Step 4: Get and transform your pokemon */}
    <div class="row">
    <h2 className="Instructions"> Step 3: Get Your Pokemon! </h2>
    </div>
    <div>
      <PokeStyleFusion currentAva = {avaDetails}/>
    </div>
    <Footer/>
  </div>
  );
}

export default App;

