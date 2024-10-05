import styled from 'styled-components';

export const HomeLayout = styled.div`
  padding: 2rem;
  display: flex;
  max-width: 1500px;
  margin: 0 auto;
  justify-content: space-between;
  flex-direction: column; 

  @media screen and (min-width: 800px) {
    padding: 2rem 3rem;
    flex-direction: row;
  }
`;

export const MeetingHeader = styled.div`
  background-color: #f1f5f9;
//   background-color: #2e371590;
  padding: 1.5rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h3 {
    border: 5px solid #2e3715;
    // width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  @media screen and (min-width: 500px) {
    padding: 2rem;
  }
`;

export const MainPane = styled.div`
  max-width: 900px;
  width: 70%;
  padding: 1rem;
`;

export const SidePane = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;

  .sideImages {
    width: 250px;
    border-radius: 10px;
    display: block;
    margin: 20px auto;
  }

  p {
    color: #2e3715;
  }
`;

export const EventContainerV2 = styled.div`
  @media screen and (min-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const EventV2 = styled.div`
  width: 100%; /* Take full width on mobile */
  margin: 1rem 0; /* Adjust margin for better spacing on mobile */
  padding: 1.5rem 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media screen and (min-width: 700px) {
    width: calc(55% - 2rem); /* Take one-third of the width on larger screens */
  }

  p {
    padding: 0.5rem 0;
    color: #4a5568;
  }

  img {
    width: 100%;
    border-radius: 15px;
    max-height: 200px;
    object-fit: cover;
  }

  .btn_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
  }
`;

export const PublicationContainerv2 = styled.div`
  padding: 1rem;
  width: 100%;

  @media screen and (min-width: 500px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Publicationv2 = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  &:hover {
    transform: scale(1.02);
  }

  h3 {
    font-size: 1rem;
    color: #4a5568;
    margin-top: 0.5rem;
  }

  a {
    color: #2e3715;
    text-decoration: underline;
    &:hover {
      color: #1e293b;
    }
  }
`;
