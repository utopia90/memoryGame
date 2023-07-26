import styled from "styled-components";


export const CountDownContainer = styled.div`
position: absolute;
    top: 1rem;
    right: 6rem;
    padding: 1rem;
    width: 5rem;
    background: orange;
    border-radius: 57px;
    height: 5rem;
    border: 4px solid black;
div{
      font-weight:bold;
      margin-top: 1rem;
    font-size:2rem;
    }
  
`
export const RestartContainer = styled.div`
position: absolute;
    top: 1rem;
    left: 6rem;
    padding: 1rem;
    width: 5rem;
    background: orange;
    border-radius: 57px;
    height: 5rem;
    cursor: pointer;
    border: 4px solid black;

div{
    font-weight: 900;
    margin-top: 1rem;
    }

    &:hover {
        opacity: 80%;
    }
`