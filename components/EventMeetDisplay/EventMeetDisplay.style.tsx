import styled from "styled-components";

export const EventMeetDisplayContainer = styled.div`
  padding: 20px;
  background-color: #f7f8f9; // Light background for a cleaner look
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Add subtle shadow for depth

  .image_preview {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 20px;
    color: #2b3513;
    margin-bottom: 10px;
  }

  .sub_header__container {
    color: #4a5a24; // Softer green for sub-headers
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #e0e0e0; // Add separator for clarity
  }

  .event_location_info {
    display: flex;
    align-items: center;
    color: #4a5a24;
    padding: 10px 0;

    p {
      padding-left: 10px;
      margin: 0;
    }
  }

  .EventMeetactionContainer {
    margin-top: 20px;
    font-size: 18px;
  }

  .organizer_container {
    display: flex;
    align-items: center;
    margin-top: 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%; // Circular image for the organizer
      margin-right: 10px;
    }

    div {
      p {
        margin: 0;
        color: #3a3a3a;
      }

      p:first-child {
        font-weight: bold;
      }
    }
  }

  .host_container {
    display: flex;
    align-items: center;
    margin-top: 15px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%; // Circular image for the host
      margin-right: 10px;
    }

    p {
      margin: 0;
    }
  }

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: space-between;

    & > div:nth-child(1) {
      width: 60%;
    }

    & > div:nth-child(2) {
      width: 35%;
    }
  }
`;
