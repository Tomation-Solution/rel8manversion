import { EventMeetDisplayContainer } from "./EventMeetDisplay.style";
import Eventimg from "../../images/eventimg.png";
import ClipImage from "../../images/clip.png";
import { GoCalendar } from "react-icons/go";
import { TiLocation } from "react-icons/ti";
import CustomBtn from "../CustomBtn/Button";
import { MeetingType, regsiterMeetingApi } from "../../redux/memberMeeting/memberMeetingApi";
import moment from "moment";
import { useMutation } from "react-query";
import useToast from "../../hooks/useToast";
import { useState } from "react";
import BasicModal from "../Modals";
import MeetingRegistration from "../Meeting/MeetingRegistration/MeetingRegistration";
import Box from "@mui/material/Box";
import Spinner from "../Spinner";

type Prop = {
  meeting: MeetingType;
};

const EventMeetDisplay = ({ meeting }: Prop) => {
  const { notify } = useToast();
  const [acceptProxyMeeting, setAcceptProxyMeeting] = useState(false);
  const [askQuestion, setAskQuestion] = useState(false);

  const { mutate: registerMeeting, isLoading: registrationLoader } = useMutation(regsiterMeetingApi, {
    onSuccess: (data) => {
      console.log({ data });
      notify("Registration Success", "success");
    },
    onError: (err: any) => {
      console.log({ err });
      notify("You must have registered already", "error");
    },
  });

  return (
    <div>
      {registrationLoader && <Spinner />}

      <BasicModal
        handleClose={() => setAcceptProxyMeeting(false)}
        open={acceptProxyMeeting}
        body={
          <MeetingRegistration
            Submit={(value) => {
              if (meeting) {
                registerMeeting({ meetingID: meeting.id, proxy_participants: value.participant });
              }
            }}
          />
        }
      />

      <BasicModal
        open={askQuestion}
        handleClose={() => setAskQuestion(false)}
        body={
          <Box sx={{ textAlign: "center", padding: ".8rem" }}>
            <h2>Register for meeting</h2>
            <br />
            <p>Do you want to invite others to this meeting or register yourself only?</p>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <CustomBtn
                style={{ marginRight: "10px" }}
                onClick={() => {
                  if (meeting) {
                    registerMeeting({ meetingID: meeting.id });
                  }
                }}
              >
                Register Only
              </CustomBtn>
              <CustomBtn
                onClick={() => {
                  setAskQuestion(false);
                  setAcceptProxyMeeting(true);
                }}
              >
                Register and invite others
              </CustomBtn>
            </div>
          </Box>
        }
      />
    <EventMeetDisplayContainer>
        <div>
            <img src={Eventimg.src} alt="Event" className="image_preview" />
            <h3>{meeting.name}</h3>
            <div className="sub_header__container">
            <p>
                <strong>Details</strong>
            </p>
            {meeting.meeting_docs && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={ClipImage.src} alt="Clip" />
                <a
                    href={meeting.meeting_docs}
                    target="_blank"
                    style={{ margin: "0 10px", color: "#2B3513" }}
                    rel="noreferrer"
                >
                    <strong>Get Event Document</strong>
                </a>
                </div>
            )}
            </div>
            <p>{meeting.details}</p>
            <div className="organizer_container">
            {meeting.organiserImage ? (
                <img src={meeting.organiserImage} alt="Organizer" />
            ) : (
                <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Organizer Placeholder"
                />
            )}
            <div>
                <p>
                <strong>Organized By:</strong> {meeting.organiserName}
                </p>
                <p>{meeting.organiserDetails}</p>
            </div>
            </div>
        </div>

        <div className="EventMeetactionContainer">
            <div className="event_location_info">
            <GoCalendar />
            <p>{moment(meeting.event_date).format("LLL")}</p>
            </div>
            <div className="event_location_info">
            <TiLocation />
            <p>
                {meeting.addresse.includes("https") ? (
                <CustomBtn
                    style={{ padding: ".3rem" }}
                    onClick={() => {
                    window.open(meeting.addresse, "_blank");
                    }}
                >
                    Join
                </CustomBtn>
                ) : (
                meeting.addresse
                )}
            </p>
            </div>
            <br />
            <CustomBtn onClick={() => setAskQuestion(true)} style={{ borderRadius: "30px" }}>
            Register for Event
            </CustomBtn>
        </div>
    </EventMeetDisplayContainer>
    </div>
  );
};

export default EventMeetDisplay;
