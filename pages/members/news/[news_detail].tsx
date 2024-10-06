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
import { Container, Box, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';

export const img_url = 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'

const NewsDetail: NextPage = () => {
  const isLaptop = useMediaQuery({ query: '(min-width: 524px)' });
  const [data, setData] = useState<any | MemberNewsType>();
  const dispatch = useAppDispatch();
  const { comment, commentStatus } = useAppSelector(selectNews);

  useEffect(() => {
    if (localStorage.getItem('news')) {
      const news = JSON.parse(localStorage.getItem('news'));
      setData(news);
      dispatch(getNewsComment({ 'news_id': news.id }));
    }
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ padding: '4rem 0' }}>
        {commentStatus === 'loading' && <CircularProgress />}

        {data && (
          <Card sx={{ maxWidth: 600, margin: '0 auto', borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="300"
              image={data.image}
              alt={data.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                {data?.name}
              </Typography>
              {data?.body && (
                <Box dangerouslySetInnerHTML={{ __html: `${data.body}` }} />
              )}
            </CardContent>
          </Card>
        )}

        {/* Comment Section */}
        <Box sx={{ maxWidth: 500, margin: '2rem auto' }}>
          {comment.map((data: any, index: number) => (
            <PostComentDetails
              deleteItem={(itemId) => {
                dispatch(deleteNewsComment(itemId));
              }}
              data={data}
              key={index}
            />
          ))}
          <Box mt={10}>
            <CommentInputWIthLabel
              submit={(value) => {
                if (data) {
                  dispatch(createNwsComment({ news: data.id, comment: value }));
                }
              }}
            />
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default NewsDetail;