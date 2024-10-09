import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
// import { Box, TextField } from "@material-ui/core";
import { Box, TextField } from '@mui/material'; // Correct import for Material-UI v5
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMemberEvent } from "../../redux/memberEvents/memeberEventsSlice";
import { getEventAttendies } from '../../redux/memberEvents/memeberEventsApi';
import { useRouter } from "next/router";
import useToast from "../../hooks/useToast";
import axios from "../../helpers/axios";

import { DashboardLayout } from "../../components/Dashboard/Member/Sidebar/dashboard-layout";
import Spinner from "../../components/Spinner";
import Table from '../../components/Table/Table';
import CustomBtn from "../../components/CustomBtn/Button";
import LatestUpdateAndGallery from "../../layout/LatestUpdateAndGallery/LatestUpdateAndGallery";
import MeetDisplay from "../../components/MeetDisplay/MeetDisplay";

interface RequestRescheduleFormProps {
  eventId: number;
}

export const RequestRescheduleForm: React.FC<RequestRescheduleFormProps> = ({ eventId }) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const { notify } = useToast();

  const onSubmit = async () => {
    const data = {
      event: eventId,
      startDate: date,
      startTime: time
    };
    
    try {
      const resp = await axios.post('/tenant/event/request-reschedule/', data);
      console.log(resp);
      notify("Reschedule request submitted successfully", 'success');
    } catch (e: any) {
      console.error(e);
      notify("Failed to submit reschedule request", 'error');
    }
  };

  return (
    <form style={{ textAlign: 'center', padding: '1rem' }}>
      <h2>Request for Reschedule</h2>
      <p>The event date does not work for you? Request a reschedule.</p>
      <Box mt={3}>
        <TextField
          placeholder="Time"
          required
          size="small"
          fullWidth
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </Box>
      <Box mt={3}>
        <TextField
          placeholder="Date"
          required
          size="small"
          fullWidth
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Box>
      <Box mt={3}>
        <CustomBtn onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }} style={{ width: '200px' }}>
          Submit
        </CustomBtn>
      </Box>
    </form>
  );
};

const EventDetail: NextPage = () => {
  const isLaptop = useMediaQuery({ query: '(min-width: 524px)' });
  const router = useRouter();
  const { notify } = useToast();
  const { attendies, status, errorMessage } = useAppSelector(selectMemberEvent);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = localStorage.getItem('event_detail');
      if (event) {
        dispatch(getEventAttendies({ event_id: JSON.parse(event).id }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (status === 'created') {
      notify("Registration Successful", 'success');
      router.push('/members/events/');
    }
    if (status === 'error') {
      notify(errorMessage, 'error');
    }
  }, [status, errorMessage, notify, router]);

  if (typeof window === 'undefined') {
    return <Spinner />;
  }

  const eventDetail = localStorage.getItem('event_detail');
  const data = eventDetail ? JSON.parse(eventDetail) : null;

  const columns = [
    {
      Header: 'Email',
      accessor: 'email',
      id: 1,
    },
    {
      Header: 'Full Name',
      accessor: 'full_name',
    }
  ];

  return (
    <LatestUpdateAndGallery>
      <p style={{ cursor: 'pointer' }} onClick={() => router.push('/members/events/')}>
        Back to Events
      </p>
      {data && <MeetDisplay event={data} />}
    </LatestUpdateAndGallery>
  );
};

export default EventDetail;
