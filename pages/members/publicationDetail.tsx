import { NextPage } from "next";
import {useEffect,useState} from 'react';
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useMediaQuery } from 'react-responsive'
import Spinner from "../../components/Spinner";
import {Grid, Button, Typography} from '@mui/material';
import {MemberPublicationType} from '../../redux/memberPublication/memberPublicationAPi'
import { MemberNewsType } from "../../redux/memberNews/memberNewsApi";
import { createPublicationComment, deletePublicationComment, getPublicationComment } from "../../redux/publication/publicationApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPublication } from "../../redux/publication/publicationSlice";
import { ContentReactionContainer } from "../../styles/news.style";
import {GoThumbsup,GoThumbsdown} from 'react-icons/go'
import PostComentDetails from "../../components/PostComentDetails/PostComentDetails";
import CommentInputWIthLabel from "../../components/CommentInputWIthLabel/CommentInputWIthLabel";
import CustomBtn from "../../components/CustomBtn/Button";
import { useMutation } from "react-query";
import { dynamicPaymentApi } from "../../redux/payment.api";


const NewsDetail:NextPage=()=>{
    const isLaptop = useMediaQuery({
        query: '(min-width: 524px)'
      })
    const [data,setData] = useState<any|MemberNewsType>()
    const dispatch = useAppDispatch()
    const {isLoading,mutate} = useMutation(dynamicPaymentApi)
    
    const  {comment,commentStatus}  = useAppSelector(selectPublication)
    
    useEffect(()=>{
        if( localStorage.getItem('publication_detail')){
            setData(JSON.parse(localStorage.getItem('publication_detail')))
            const publication = JSON.parse(localStorage.getItem('publication_detail'))
            dispatch(getPublicationComment({'publication_id':publication.id}))
          }
    },[])
    //   if(typeof window == 'undefined'){
    //     return <Spinner/>
    //   }
    //   let data:any = null
    //   if( localStorage.getItem('publication_detail')){
    //     data  = JSON.parse(localStorage.getItem('publication_detail'))
    //   }
    return (
        <DashboardLayout>
             <img src={data?.image} alt="" 
             style={{'display':'block','borderRadius':'10px','width':'400px','height':'300px','margin':'0 auto'}}
             />
{
(commentStatus=='loading'||isLoading)?<Spinner/>:''
}


            <div style={{'padding':'0  1rem','margin':'0 auto','maxWidth':'900px',}}>
                            <h2 style={{'textAlign':'center'}}>{data?.name}</h2>

                {/* {
                    data?.paragraphs?.map((p,index)=>(
                        <div key={index}>
                            <Grid  style={{'color':'#000000c4'}} >
                            {p.paragragh}
                        </Grid>
                        <br />
                        </div>

                    ))
                } */}
                {
                data?.body?
                <div
               dangerouslySetInnerHTML={{
                 __html: `${data.body}`,
               }}
             />:''
                }
            </div>
            

            {/* <ContentReactionContainer>
                <div className="" style={{'padding':'0 .4rem'}}>
                    <GoThumbsup/>
                    <p>Like</p>
                </div>
                <div className="">
                    <GoThumbsdown/>
                    <p>Dislike</p>
                </div>
            </ContentReactionContainer> */}
            <br />
            <div style={{'margin':'0 auto','maxWidth':'500px'}}>
           {
               comment.map((data:any,index:number)=>(
                    <PostComentDetails
                    deleteItem={(itemId)=>{
                        dispatch(deletePublicationComment(itemId))
                    }}
                    data={data} key={index}/>
                ))
            }


            <br />
            <br />
            <div>
                {
                data?.is_paid?
                <CustomBtn 
                onClick={e=>{
                    mutate({'payment_id':data.id,'payment_type':'paid_publication'})
                }}
                style={{'width':'300px','margin':'0 auto'}} >
                    Pay for publication: ₦{data?.amount}
                </CustomBtn>:
                <CustomBtn 
                onClick={e=>{
                    window.open(data.danload,'_blank')

                }}
                style={{'width':'300px','margin':'0 auto'}} >
                    Download Publication
                </CustomBtn>
                }
            </div>
            <br /><br />
            <CommentInputWIthLabel submit={(value)=>{
                console.log({'value':value})
                if(data){
                    dispatch(createPublicationComment({
                        'news':data.id,
                        'comment':value
                    }))
                }
            }}/>
           </div>
           <br /><br />
        </DashboardLayout>
    )
}

export default NewsDetail