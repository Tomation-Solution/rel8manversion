import styled from "styled-components";



export const ProspectiveSideBarContainer = styled.div`
    /* border: 1px solid red; */
    max-width: 250px;
    height: 100vh;
    background-color: #045696;

    .nav_logo_propective{
        width: 100%;
        height: 100px;
        display: block;
        object-fit: contain;
        border-bottom: 1px solid #ffffff38;
    }

.ProspectiveSideBarContainer__body{
    background-color: #045696;
    list-style-type: none;
    li a{
        padding: 1rem 1.4rem;
        display: block;
        font-size: 1.2rem ;
        text-align: left;
        color: white;
        cursor: pointer;
        transition: .7s all ease-in-out;

        &:hover{
            background-color: white;
            color: #045696;
        }
    }
}
`