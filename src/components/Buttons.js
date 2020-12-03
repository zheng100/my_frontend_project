import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ color }) => color || "blue"};
  padding: 10px 10px;
  border-radius: 25px;
  border: none;
  margin: 10px 10px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const ButtonToggle = styled(Button)`
  opacity: 0.5;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
    

  `}
`;
const ButtonGroup = styled.div`
  display: block;
  justify-content: center;
`;


function ToggleGroup(props) {
    
    const type = props.colorType;
    const Colors = props.colorCode;
    const styles = Object.keys(props.colorCode)
    const [active, setActive] = useState(styles[0]);

    function handleOnClick(style){
        props.updateFunction(type,style);
        props.changeColorFun(style);
        setActive(style);
    }

    return (
        <ButtonGroup>
          {styles.map(style => (
            <ButtonToggle 
              key={style}
              color = {Colors[style]}
              active={active === style}
              onClick={() => handleOnClick(style)}
            >
            </ButtonToggle>
          ))}
        </ButtonGroup>
    );
  }

export default ToggleGroup;