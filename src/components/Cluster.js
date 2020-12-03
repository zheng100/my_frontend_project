import React from "react";
import {Piece} from 'avataaars';
import { renderToStaticMarkup } from 'react-dom/server';

const PIECESIZE = 100;

function pieceSelect(type,style){
    if (type === 'mouth') return <Piece pieceType= "mouth" pieceSize= {PIECESIZE * 5} mouthType = {style}/>
    if (type === 'eyes') return <Piece pieceType= "eyes" pieceSize= {PIECESIZE * 5} eyeType = {style}/>
    if (type === 'eyebrows') return <Piece pieceType= "eyebrows" pieceSize = {PIECESIZE * 1.5} eyebrowType = {style}/>
    if (type === 'accessories') return <Piece pieceType= "accessories" pieceSize= {PIECESIZE * 1.5} accessoriesType = {style}/>
    if (type === 'top') return <Piece pieceType= "top" pieceSize = {PIECESIZE * 0.5} topType = {style} hairColor="Black"/>
    if (type === 'facialHair') return <Piece pieceType= "facialHair" pieceSize= {PIECESIZE} facialHairType = {style}/>
    if (type === 'clothe') return <Piece pieceType= "clothe" pieceSize= {PIECESIZE} clotheType = {style} clotheColor="white"/>
}

const pieceSize = {
    'mouth': 100,
    'eyes': 100, 
    'eyebrows': 100, 
    'accessories': 100, 
    'top': 100, 
    'facialHair': 100, 
    'clothe': 100, 
}

function Cluster(props) {
    const type = props.type
    const style = props.style
    const pieceObject = pieceSelect(type,style)
    let ImgSrc = encodeURIComponent(renderToStaticMarkup(pieceObject));
    let dataUri = `data:image/svg+xml,${ImgSrc}`;

    return (
            <img src = {dataUri} height = '80' width = '80'></img>
    );  
}

export default Cluster;