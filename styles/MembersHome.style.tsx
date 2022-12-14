import styled from 'styled-components';


/* light blue - #04a9fb

thick blue - #075a94
*/
export const HomeLayout = styled.div`
@media screen and (min-width: 800px){
        padding: 1.8rem;
        display: flex;
        justify-content: space-between;
}
`

export const MeetingHeader = styled.div`
    background-color: #04a9fb90;
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between  ;
    max-width: 700px;

    h3{
        border:10px solid white;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center  ;
    }

    @media screen and (min-width: 500px) {
    padding: 1rem 1.5rem;
    }
`

export const MainPane = styled.div`
max-width: 800px;

`
export const SidePane = styled.aside`
display: flex;
flex-direction: column;
    .sideImages{
        width: 250px;
        border-radius: 10px;
        display: block;
        margin: 20px 0;
    }
p{  
    color:#075a94 ;
}
`



export const GalleryEventGrid = styled.div`
    padding: 1rem;
    max-width: 900px;
    margin: 0 auto;
    .galleryContainer{
        position:  relative;
    }
 .galleryContainer img{
    width: 100%;
    height: 100%;
    border-radius: 10px;

 }
 .galleryContainer p{
    color: #075a94;
 }
 .galleryContainer h2{
    position: absolute;
    top: -30px;
 }
 @media screen  and (min-width: 900px){
    display: flex;
    /* align-items: center; */
    padding: 1.5rem 0;
    .galleryContainer{
        overflow: visible;
    }
    .galleryContainer img{
        object-fit: cover;
        height: 100%;
        
    }

&> div:nth-child(1){
    width: 40%;
}
&> div:nth-child(2){
    width: 60%;

}
 }
`


export const EventContainerV2 = styled.div`
 
 @media screen  and (min-width: 700px){
    display: flex;
    justify-content: space-between;
    align-items: center

 }
`

export const EventV2 = styled.div`
width: 100%;
    margin: 1rem;
        padding: 1rem 0;
    p{
        padding:.5rem 0;
    }
    img{
        width: 100%;
    border-radius: 10px;
    max-height: 200px;
        /* height: 80%; */
    }
    .btn_container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 150px;
    }
    button{
        border: transparent;
        display: inline-block;
        padding: .5rem 1rem;
        cursor: pointer;
    }
    button.not_main{
        border: 1px solid #075a94;
        color:  #075a94;
    }
    button.main{
        background-color: #075a94;
        color: white;
    }
`

export const PublicationContainerv2 = styled.div`
    padding: 1rem;
    width: 100%;
    @media screen  and (min-width:500px){
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
`

export const Publicationv2 = styled.div`
    padding: .4rem;

        img{
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            border-radius:10px;
        }
`