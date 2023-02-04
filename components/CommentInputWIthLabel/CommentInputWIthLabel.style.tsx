import styled from "styled-components";



export const CommentInputWIthLabelContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
img{
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
}  
input{
    display: block;
    padding: 1rem .6rem;
    background-color: #dcdcdc53;
    color: black;
        border: 1px solid transparent;
        border-radius: 10px;
        width: 90%;
        outline: none;
    }
`