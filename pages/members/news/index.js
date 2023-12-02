import { Grid, Typography } from "@mui/material";
import Link from 'next/link'
import { DashboardLayout } from "../../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { getMemberNews } from "../../../redux/memberNews/memberNewsApi";
import Spinner from "../../../components/Spinner";
import Newscard from "../../../components/NewsCard";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectMemberNews } from "../../../redux/memberNews/memberNewsSlice";
import { useEffect } from "react";

export default function News(props){
    const {news,status:news_status} = useAppSelector(selectMemberNews)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(getMemberNews({}))

    },[])
    return(
        <DashboardLayout>
          {news_status=='pending'&&<Spinner/>}

<Grid container spacing={2} style={{'padding':'1rem'}}>

{
                news.map((data,index)=>(
                  <Newscard
                  key={index}
                  title={data.name}
                  image={data.image}
                  body={
                    <div>
                      
                    </div>
                  }
                  data={data}
                  />
                ))
              }
              
</Grid>

        </DashboardLayout>
    )
}