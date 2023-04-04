import styled from "styled-components";



export const EventMeetDisplayContainer = styled.div`
    padding:10px 0;
img{
    border-radius:10px;
}
h3{
    font-size:17px;
    color:#2B3513;
}
 .sub_header__container {
    color:#2B3513;
    display:flex;
    justify-content:space-between;
    padding:10px 0;
    
}

.event_location_info{
    display:flex;
    color:#2B3513;
    padding:10px 0;
    p{
        padding-left:10px;
    }

}

.EventMeetactionContainer{
    margin:10px 0;
    font-size:20px;
}

.host_container{
    img{
        width:50px;
        height:50px;
    }
}

@media screen and (min-width: 1200px){
    display:flex;
    justify-content:space-between;
    & > div:nth-child(1){
    width:60%;
    }
    & > div:nth-child(2){
    width:40%;
    }
}
`