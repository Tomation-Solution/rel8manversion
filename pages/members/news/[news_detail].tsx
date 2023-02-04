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

export const img_url = 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
export const NewsDetail:NextPage = ()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })

      if(typeof window == 'undefined'){
        return <Spinner/>
      }
      let data:any|MemberNewsType  = null
      if( localStorage.getItem('news')){
        data  = JSON.parse(localStorage.getItem('news'))
      }
      console.log(data)
      return (
        <DashboardLayout>
            <div style={{'padding':'4rem 0',}}>
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
                [...new Array(3)].map((data:any,index:number)=>(
                    <PostComentDetails key={index}/>
                ))
            }
            <br />
            <br />
            <CommentInputWIthLabel/>
           </div>
            <br />
            <br />
            </div>
        </DashboardLayout>
    )
}

export default NewsDetail