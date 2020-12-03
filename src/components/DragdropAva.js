import React , {useState, useEffect} from "react";
import Cluster from './Cluster';
import ModAvatar from './ModAvatar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToggleGroup from './Buttons';

const POKETAR_WHITE = "#ffffff"
const POKETAR_BLUE = "#5db9ff"
const POKETAR_PURPLE = "#DAF7A6" //face component selected color?
const POKETAR_RED = "#ff1f1f"
const POKETAR_YELLOW = "#ffffff" // face component selections?


function DragdropAva (props){

    const [avaDetails,setavaDetails] = useState(props.avaDetails);
    useEffect(() => { setavaDetails(props.avaDetails) }, [props.avaDetails]);

    const skinColorSet = props.skinColorSet;
    const hairColorSet = props.hairColorSet;
    const clothColorSet = props.clothColorSet;
    const datafromBackend = props.datafromBackend;

    // function that handles drag ending event
    function handleOnDragEnd(result){
        if(!result.destination) return;
        const{source,destination} = result;
        if (destination.droppableId === 'MainAvatar'){
            const draggable_string = result.draggableId;
            const regfound_tags = draggable_string.match(/([A-Za-z]+)_([A-Za-z]+)/);
            const [type, style] = [regfound_tags[1], regfound_tags[2]];
            handleOnChangeAvatar(type, style);
        }
    }

    // update current avatar look
    function handleOnChangeAvatar(type, style) {
        const updatedDetails = avaDetails;
        updatedDetails[type] = style;
        // console.log(updatedDetails);
        props.avaChangeFun(updatedDetails);
        }

return (
    <div class='container-fluid' id = 'content-container'>
    {/*center avatar*/}
    <DragDropContext onDragEnd = {handleOnDragEnd}>
      {/* Dropable portion that of the Avatar display */}
      <Droppable droppableId = "MainAvatar" > 
        {(provided,snapshot) => {
          return (
            <div id = "my_ava"
            {...provided.droppableProps} ref={provided.innerRef} 
              style = {{
              background: snapshot.isDraggingOver? POKETAR_BLUE: POKETAR_WHITE}}>
              <ModAvatar avaDetails = {avaDetails}/>
            </div>)
            }}
      </Droppable>
      <div className="row">
        <div className="col-sm-4" id='skin_color'>
            <h3>Skin Color</h3>
                <div className="bd-example">
                <ToggleGroup className="colors" colorCode = {skinColorSet} colorType = 'skinColor'  changeColorFun = {props.setcolorDisplay} updateFunction = {handleOnChangeAvatar}/> 
                </div>
        </div> 

        <div className="col-sm-4" id='hair_color'>
            <h3>Hair Color</h3>
                <ToggleGroup className="colors" colorCode = {hairColorSet} colorType = 'hairColor' changeColorFun = {props.setcolorDisplay} updateFunction = {handleOnChangeAvatar}/> 
        </div>

        <div className="col-sm-4" id='cloth_color'>
            <h3>Cloth Color</h3>
            <ToggleGroup className="colors" colorCode = {clothColorSet} colorType = 'clotheColor' changeColorFun = {props.setcolorDisplay} updateFunction = {handleOnChangeAvatar}/> 
        </div>
      </div>

    {/* Drag and droppable features and clothing */}
    <h2 className="Instructions"> Step 2: Drag and Drop items to Change his look! </h2>
      <div id = 'droppable-content'>
        {/* Double loop that go through all possible type of looking and styles */} 
        {Object.entries(datafromBackend).map(([type, styles]) =>{
          return(
            
            <div id = 'step2_wrap'>
              {/* Each column is also a droppable */} 
              <Droppable droppableId = {type}>
                {(provided, snapshot) => {
                return(
                  <div className = 'OverflowColumn'
                    {...provided.droppableProps} ref={provided.innerRef} 
                    style = {{
                        background: snapshot.isDraggingOver? POKETAR_BLUE: POKETAR_WHITE,
                    }}>
                    <ul className = 'addons'>
                        {styles.map((style,index) => {
                            return (
                                // Each item in the column is a draggable
                                <Draggable draggableId = {type + '_' +style} index={index} key={index}>
                                {(provided, snapshot) => {
                                    return(<div
                                                ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                style = {{ backgroundColor: snapshot.isDragging? POKETAR_PURPLE : POKETAR_YELLOW , color: POKETAR_WHITE, ...provided.draggableProps.style
                                                }}>
                                                <li key ={type + style}>
                                                    <wrap className = "selectAble">
                                                        {<Cluster type = {type} style = {style}/>}
                                                    </wrap>
                                                </li>
                                            </div>); 
                                }}
                                </Draggable>
                            ); 
                          })
                        }
                    </ul>
                  </div>)
                }}
              </Droppable>
            </div>);
          })}
      </div>

      </DragDropContext>

    </div> 
);

    
}

export default DragdropAva;