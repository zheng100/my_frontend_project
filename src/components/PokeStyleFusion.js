import React, { useState } from 'react';

import pokeball from '../images/pokeball.png';

import ModAvatar from './ModAvatar';
import axios from "axios";
import * as mi from '@magenta/image';
import { renderToStaticMarkup } from 'react-dom/server';
import canvasToImage from 'canvas-to-image';


const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon/"

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function PokeStyleFusion(props) {

    const model = new mi.ArbitraryStyleTransferNetwork();
    let currentAva = props.currentAva;

    let contentImgSrc = encodeURIComponent(renderToStaticMarkup(<ModAvatar avaDetails={currentAva} />));
    let dataUri = `data:image/svg+xml,${contentImgSrc}`;

    //console.log(dataUri);

    const [pokeName, setpokeName] = useState("-")
    const [pokeType, setpokeType] = useState("-")
    const [pokeImageUri, setpokeImageUri] = useState(pokeball)
    const [pokeImageDisplayUri, setPokeImageDisplayUri] = useState(pokeball)

    function fetchPokemon() {
        const fetchingURL = POKE_API_URL + getRandomInt(150);
        DataPromise(fetchingURL);
    };
    

    function saveCanvas(){
        const canvasEl = document.getElementById('stylized');
        canvasToImage(canvasEl, {
            name: 'myAvaImage',
            type: 'jpg',
            quality: 1
          });
    }
    // function to get pokemon type
    function getPokemonType(typeList) {
        let pokeType = "";

        for (let i = 0; i < typeList.length; i++) {
            // get the value of the key "type", which is another object
            let typeObject = typeList[i]["type"];
            // then get the value of the key "name" which will be the pokemon type
            let typeStr = typeObject["name"];
            // add the type into pokeType
            if (i > 0) {
                pokeType = pokeType + ", " + typeStr;
            }
            else {
                pokeType = pokeType + " " + typeStr;
            }
        }

        return pokeType;
    }

    function DataPromise(apiUrl) {
        axios.get(apiUrl).then((response) => {
            const pokemonData = response.data;
            const pokemonName = pokemonData['name'];
            const pokemonimageURI = pokemonData['sprites']['other']['official-artwork']['front_default'];
            const pokeType = getPokemonType(pokemonData['types']);
            console.log(pokemonData);
            setpokeName(pokemonName);
            setpokeType(pokeType);
            setpokeImageUri(pokemonimageURI);
        }).catch((error) => {
            console.log(error);
        })
    }


    function stylization() {
        model.initialize().then(() => {  
            stylize();  
        }  
        );  
    }

    function meetPoke(){
        setPokeImageDisplayUri(pokeImageUri); 
    }

    async function stylize() {
        // await clearCanvas();

        // const contentCanvas = document.getElementById('styledAva').childNodes[0].childNodes[0];
        const contentImg = document.getElementById('content')
        const styleImg = document.getElementById('style');
        const canvas = document.getElementById('stylized');
        const ctx = canvas.getContext('2d');

        // Resize the canvas to be the same size as the source image.
        canvas.width = contentImg.width;
        canvas.height = contentImg.height;

        // This does all the work!
        model.stylize(contentImg, styleImg).then((imageData) => {
            ctx.putImageData(imageData, 0, 0);
        });
    }

    return (
        <div id='select_pokemon'>

        <div class="row">

            <div class="col-md-6">
                <h3 id='pokeName'> Pokemon name: </h3>
                <p id='pokeName'> {pokeName} </p>
            </div>

            <div class="col-md-6">
                <h3 id='pokeName'> Pokemon type: </h3>
                <p id='pokeType'> {pokeType} </p>
            </div>
        </div>
        <div class="col-12-text-center">
            <button type="button" class="btn btn-primary btn-lg" onClick={fetchPokemon}>
                Fetch Random Pokemon
            </button>
        </div>

            <h2 className="Instructions"> Step 4: Meet Your New Pokemon! </h2>
            <img id='content' height="256" src={dataUri}></img>
            <img id='style' src={pokeImageDisplayUri} height="200" width="200" crossorigin="anonymous"></img>
            {/* <canvas id='stylized' height="30" >
            </canvas> */}

            <div class="col-12-text-center">
            <button type="button" class="btn btn-primary btn-lg" onClick={meetPoke}>Meet Pokemon </button> 
            </div>


            <h2 className="Instructions"> Step 5: Experimental Merge </h2>
            <canvas id='stylized' height="30" >
            </canvas>
            <br></br>

            
            <div class="col-12-text-center">
            <button type="button" class="btn btn-primary btn-lg" onClick={stylization}>Transform!</button>
            </div>

            <br></br>

            <button type="button" class="btn btn-primary btn-lg" onClick={saveCanvas}>Save My Transformed Avatar</button>

        </div>);
   
}


export default PokeStyleFusion;