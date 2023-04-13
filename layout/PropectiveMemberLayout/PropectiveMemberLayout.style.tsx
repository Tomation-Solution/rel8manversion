import styled from "styled-components";



export const PropectiveMemberLayoutContainer =styled.div`
    

@media screen and (min-width: 500px){
    
    display: flex;
    /* justify-content: ; */
    /* align-items: center; */
    height: 100vh;
    
    
    & > div:nth-child(1){
        width: 20%;
    }
    
    & > div:nth-child(2){
        width: 80%;
    }
}
`