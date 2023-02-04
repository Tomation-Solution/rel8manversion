import styled from "styled-components";


export const ContentReactionContainer = styled.div`
    
    margin: 5px auto;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: .8rem;
    display: flex;
    max-width: 400px;
    /* justify-content: space-around; */
    justify-content: space-between;

    & > div{
        display: flex;
        width: 20%;
            /* border: 1px solid red; */
        justify-content: space-between;
        cursor: pointer;
    }
`


