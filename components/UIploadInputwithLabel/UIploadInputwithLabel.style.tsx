import styled from "styled-components";


export const UIploadInputwithLabelContainer = styled.div`
    padding: 0 1rem;
    text-align: center;
    p{
        font-size: 1.3rem;
        padding: .4rem 0;
    }
    label{
        display: block;
        padding: .5rem 1rem;
        border: 1.5px dashed #045696;
        border-radius: 5px;
        svg{
            pointer-events: none;
        }
    }
    input{
        display: none;
    }
    
`