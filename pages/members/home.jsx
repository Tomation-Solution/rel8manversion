import { Grid, Typography } from "@mui/material";
import EventCard from "../../components/EventCard";
import Newscard from "../../components/NewsCard";
import Spinner from '../../components/Spinner';
import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from "react";
import { getMembersEvent, registerForMeeting } from "../../redux/memberEvents/memeberEventsApi";
import { selectMemberEvent } from "../../redux/memberEvents/memeberEventsSlice";
import { getMemberNews } from "../../redux/memberNews/memberNewsApi";
import { selectMemberNews } from "../../redux/memberNews/memberNewsSlice";
import useToast from "../../hooks/useToast";
import { useQuery } from "react-query";
import { getImagesForLayout } from "../../redux/gallery/galleryApi";
import { getMeetings } from "../../redux/memberMeeting/memberMeetingApi";
import { selectMeetings } from "../../redux/memberMeeting/memberMeetingSlice";
import { getMemberPublication } from "../../redux/memberPublication/memberPublicationAPi";
import { selectmemberPublication } from "../../redux/memberPublication/memberPublicationSlice";
import { useRouter } from "next/router";
import { EventContainerV2, EventV2, HomeLayout, MainPane, MeetingHeader, PublicationContainerv2, Publicationv2, SidePane } from '../../styles/MembersHome.style';
import moment from "moment";

export default function Home() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { status, events } = useAppSelector(selectMemberEvent);
  const { news } = useAppSelector(selectMemberNews);
  const { meetings, status: meetingStatus } = useAppSelector(selectMeetings);
  const { status: publicationStatus, publication } = useAppSelector(selectmemberPublication);
  const { notify } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { data: images } = useQuery('images_preview', getImagesForLayout, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    dispatch(getMembersEvent({}));
    dispatch(getMeetings({}));
    dispatch(getMemberNews({}));
    dispatch(getMemberPublication({}));
  }, [dispatch]);

  useEffect(() => {
    if (meetingStatus === 'registration_success') {
      notify('Registered For Meeting Successfully', 'success');
      notify('Please wait while we load the Meeting Details', 'success');
    }
    if (meetingStatus === 'error') {
      notify('Some Error Occurred', 'error');
    }
  }, [meetingStatus, notify]);

  return (
    <DashboardLayout>
      {isLoading && <Spinner />}
      <HomeLayout>
        <MainPane>
          <MeetingHeader>
            {meetings.length !== 0 ? (
              <>
                <div>
                  <h1>{meetings[0].name}</h1>
                  <p>{meetings[0].details.slice(0, 30)}...</p>
                </div>
                <h3>{moment(meetings[0].event_date).format('LLL')}</h3>
              </>
            ) : (
              <>
                <div>
                  <h1>No Meeting</h1>
                  <p>Nill</p>
                </div>
                <h3>0<br />Days</h3>
              </>
            )}
          </MeetingHeader>
          <br />
          <br />
          {meetings.length !== 0 && <h2>Meeting</h2>}
          <EventContainerV2>
            {meetings.slice(0, 3).map((data, index) => (
              <EventV2 key={index}>
                <img
                  src='https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                  alt="Meeting"
                />
                <h4><small>{data.name}</small></h4>
                <p>{data.details.slice(0, 30)}...</p>
                <div className="btn_container">
                  <button className="not_main" onClick={() => {
                    localStorage.setItem('meeting_detail', JSON.stringify(data));
                    route.push(`/members/meetings/${data.id}/`);
                  }}>
                    View
                  </button>
                </div>
              </EventV2>
            ))}
          </EventContainerV2>
          <br />
          {events.length !== 0 && <h2>Event</h2>}
          <EventContainerV2>
            {events.slice(0, 3).map((data, index) => (
              <EventV2 key={index}>
                <img src={data.image} alt="Event" />
                <h4><small>{data.name.slice(0, 43)}...</small></h4>
                {data.is_paid_event && <p>Amount: {data.amount}</p>}
                <div className="btn_container">
                  <button className='not_main' onClick={() => {
                    localStorage.setItem('event_detail', JSON.stringify(data));
                    route.push('/members/event_detail/');
                  }}>View</button>
                </div>
              </EventV2>
            ))}
          </EventContainerV2>
          <br />
          <h2>Publication</h2>
          <PublicationContainerv2>
            {publication.map((pub, index) => (
              <Publicationv2 key={index}>
                <img src={pub.image} alt="Publication" />
                <h3>{pub.name.slice(0, 23)}...</h3>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.setItem('publication_detail', JSON.stringify(pub));
                    route.push('/members/publicationDetail');
                  }}
                >
                  Read More
                </a>
              </Publicationv2>
            ))}
          </PublicationContainerv2>
          <br />
          <h2>News</h2>
          <Grid container spacing={2} style={{ padding: '1rem' }}>
            {news.slice(0, 3).map((data, index) => (
              <Newscard
                key={index}
                title={data.name.slice(0, 23) + '...'}
                image={data.image}
                data={data}
              />
            ))}
          </Grid>
        </MainPane>
        <SidePane>
          <h2>Gallery</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {images?.map((img, index) => (
              <img className="sideImages" key={index} src={images.length !== 0 ? img.images[0].image : ''} alt="Gallery" />
            ))}
          </div>
          <p onClick={() => route.push('/members/gallery')}>See More</p>
        </SidePane>
      </HomeLayout>
    </DashboardLayout>
  );
}
