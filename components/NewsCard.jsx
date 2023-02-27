import { Grid, Typography, Button } from "@mui/material";
import styles from '../styles/Home.module.css';
import GreenButton from "./Buttonn";
import { useRouter } from "next/router";
// import NewsImage from '../images/Vectorlanding.png'

export default function Newscard (props){
    //this is very bad component but u need to know i was in an hurry sorry
    const route = useRouter()
    const saveNews = ()=>{
        localStorage.setItem('news',JSON.stringify(props.data))
        route.push('/members/news/detail')
    }
    return(
        <Grid md={4} padding={'10px'} >
            <img style={{'width':'100%','height':'200px','objectFit':'contain','borderRadius':'10px'}} src={props.image} marginTop={0} className='rounded-corners'/>
           
           <div style={{'padding':'0 10px','textAlign':'center'}}>
           <Typography fontWeight='bold'  marginY={1}>{props.title}</Typography>
            <Typography variant="body2" marginBottom={2}>{props.body}</Typography>
            <Grid md={10} sm={9} style={{margin:'0 auto'}}>
                {/* <Button variant='contained'  size='small' className={[styles.button, 'button-lower rounded-button'] }>
                    More
                </Button>
                <GreenButton/> */}
                <GreenButton text='More' radius='10px'
                click={(e)=>{
                    if(props.onBtnClick){
                        props.onBtnClick()
                    }else{
                        saveNews()
                    }
                }}
               textColor='white' paddingY={1} paddingX={1}  bg='#04a9fb'/>
            </Grid>
           </div>
        </Grid>
    )

}