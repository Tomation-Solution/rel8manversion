import styled from "styled-components";



export const MemeberCardContainer = styled.div`
margin: 0 auto;
text-align: center;
/* border: 1px solid red; */
max-width: 400px;
box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
/* width: 250px; */
h2{
    font-size: 1rem;
}
.member_postion{
    color:#000000ab;
} 

.MemberCardphotoConainer {
    height: 150px;
    width: 150px;
    overflow: hidden;
    border-radius: 10px;
    margin: 0 auto;
}
.MemberCardphotoConainer img{
    height: 100%;
    width: 100%;

    object-fit: contain;
}
`