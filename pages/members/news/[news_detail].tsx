import { useEffect} from 'react'
import { NextPage } from "next";
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useMediaQuery } from 'react-responsive'
import {Grid, Button, Typography} from '@mui/material';
import Spinner from "../../../components/Spinner";
import { useState } from "react";
import { MemberNewsType } from "../../../redux/memberNews/memberNewsApi";
import { ContentReactionContainer } from "../../../styles/news.style";
import {GoThumbsup,GoThumbsdown} from 'react-icons/go'
import PostComentDetails from "../../../components/PostComentDetails/PostComentDetails";
import CommentInputWIthLabel from "../../../components/CommentInputWIthLabel/CommentInputWIthLabel";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectNews } from '../../../redux/news/newsSlice';
import { createNwsComment, deleteNewsComment, getNewsComment } from '../../../redux/news/newsApi';

export const img_url = 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
export const NewsDetail:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
    const [data,setData] = useState<any|MemberNewsType>()
    const dispatch = useAppDispatch()
    const  {comment,commentStatus}  = useAppSelector(selectNews)

    useEffect(()=>{
        console.log({window})
        if( localStorage.getItem('news')){
            setData(JSON.parse(localStorage.getItem('news')))
            const news = JSON.parse(localStorage.getItem('news'))
            dispatch(getNewsComment({'news_id':news.id}))
          }
    },[])
      
    //   if(typeof window == 'undefined'){
    //     return <Spinner/>
    //   }
     

    
      return (
        <DashboardLayout>
            <div style={{'padding':'4rem 0',}}>
                {
                    commentStatus=='loading'?<Spinner/>:''
                }
            <img 
            // src={data?.image} 
            src={img_url} 
            // 
            alt=""  style={{'display':'block','borderRadius':'10px','width':'400px','height':'300px','margin':'0 auto'}}/>


            <div style={{'padding':'0  1rem','margin':'0 auto','maxWidth':'900px',}}>
                <h2 style={{'textAlign':'center'}}>{data?.name}</h2>

                {
                    data?.paragraphs?.map((p,index)=>(
                        <div key={index}>
                            <Grid  style={{'color':'#000000c4'}} >
                            {p.paragragh}
                        </Grid>
                        <br />
                        </div>

                    ))
                }
                
            </div>

            <ContentReactionContainer>
                <div className="" style={{'padding':'0 .4rem'}}>
                    <GoThumbsup/>
                    <p>Like</p>
                </div>
                <div className="">
                    <GoThumbsdown/>
                    <p>Dislike</p>
                </div>
            </ContentReactionContainer>
<br />
           <div style={{'margin':'0 auto','maxWidth':'500px'}}>
           {
               comment.map((data:any,index:number)=>(
                    <PostComentDetails
                    deleteItem={(itemId)=>{
                        dispatch(deleteNewsComment(itemId))
                    }}
                    data={data} key={index}/>
                ))
            }
            <br />
            <br />
            <CommentInputWIthLabel submit={(value)=>{
                console.log({'value':value})
                if(data){
                    dispatch(createNwsComment({
                        'news':data.id,
                        'comment':value
                    }))
                }
            }}/>
           </div>x
            <br />
            <br />
            </div>
        </DashboardLayout>
    )
}

export default NewsDetail