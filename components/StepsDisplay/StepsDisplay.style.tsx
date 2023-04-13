import styled from "styled-components";





export const StepsDisplayContainer = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:1rem .3rem;
        position: relative;
    .display_line{
        height: 2px;
        width: 96%;
        position: absolute;
        background-color: #2e3715;
    }

    
        .display_ball{
            height: 50px;
            width: 50px;
            border: 1px dotted #2e3715;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-size:1.5rem;
            position: relative;
            z-index: 100;
            background-color: white;
            position: relative;
            &.active{
                background-color: #2e3715;
                color: white;
            }

           
        }

        
`