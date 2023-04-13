import styled from "styled-components";

export const MeetingPreviewCardContainer = styled.div`
    min-width:300px;
    /* border:1px solid red; */
    margin:10px 0;
    background-color:#f5f5f529;
    padding:1rem;
    border-radius:10px

    .main_meeting_time{
        font-size:20px;    
    }

    .meeting_title{
        padding:.6rem 0;
    }
    & div{
        display:flex;
        max-width:300px;
        /* border:1px solid green; */
        justify-content: space-between;
    }

    & div p{
        color:#B5B5B5;
        cursor:pointer;
    }
`