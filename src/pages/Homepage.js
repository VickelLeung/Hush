import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { LandingInfo } from "../components/LandingInformation/LandingInfo";
import { Button } from "@material-ui/core";
import { bounce } from "react-animations";
import { bounceInUp } from "react-animations";
import { bounceInDown } from "react-animations";
import { pulse } from "react-animations";
import Lock from "../images/homepageIcons/lock.png";
import Confidential from "../images/homepageIcons/confidential.png";
import Anonymous from "../images/homepageIcons/anonymous.png";
import Share from "../images/homepageIcons/share.png";

const Homepage = () => {
  return (
    <Wrapper>
      <LineContainer>
        <Line></Line>
        <Line></Line>
        <Line></Line>
      </LineContainer>

      <TitleContainer>
        <Title>WELCOME TO HUSH</Title>
        <SubTitle>
          Share your secret to the world. Don’t just keep it, let everyone know
          about it
        </SubTitle>
        <BtnContainer>
          <Link style={{ textDecoration: "none" }} to="/createpost">
            <LinkBtn variant="outlined">Start sharing your secret now!</LinkBtn>
          </Link>
        </BtnContainer>
      </TitleContainer>

      <BoxContainer>
        <WhiteBox1>{/* <Image src={Lock} /> */}</WhiteBox1>
        <BlackBox1>{/* <Image src={Confidential} /> */}</BlackBox1>
        <BlackBox2>{/* <Image src={Anonymous} /> */}</BlackBox2>
        <WhiteBox2>{/* <Image src={Share} /> */}</WhiteBox2>
      </BoxContainer>
    </Wrapper>
  );
};

export { Homepage };

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
`;

const LandingContainer = styled.div`
  margin-bottom: 3%;
`;

const MainContainer = styled.div``;

const InfoContainer = styled.div``;

const Title = styled.h2`
  text-decoration: none;
  font-size: 58px;
`;

// const SubTitle = styled.div`
//   font-size: 1.5em;
//   margin-bottom: 2%;
// `;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2% 10%;
  padding: 1%;
  font-size: 1.2em;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const CreateContainer = styled.div`
  margin: 4% 10%;
  padding: 2%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Bar = styled.div`
  border-bottom: 2px solid black;
  margin: 4% 10%;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Line = styled.div`
  height: 90vh;
  width: 3.5vw;
  background-color: #303030;
  margin-right: 15%;
`;

const TitleContainer = styled.div`
  text-align: center;
  align-self: start;
  margin: 10% 4%;
`;
const SubTitle = styled.div`
  font-size: 1.3em;
`;

// const bounceAnimation = keyframes`${bounce}`;
// const bounceUpAnim = keyframes`${bounceInUp}`;
// const bounceDownAnim = keyframes`${bounceInDown}`;
const pulseAnim = keyframes`${pulse}`;

const BlackBox1 = styled.div`
  margin: 2%;
  border-radius: 20px;
  height: 12em;
  width: 12em;
  background-color: #555;

  animation: 1s ${pulseAnim} infinite;
`;

const BlackBox2 = styled.div`
  margin: 2%;
  border-radius: 20px;
  height: 12em;
  width: 12em;
  background-color: #555;

  animation: 2s ${pulseAnim} infinite;
`;

const WhiteBox1 = styled.div`
  margin: 2%;
  border: 2px solid black;
  border-radius: 20px;
  height: 12em;
  width: 12em;
  background-color: white;
  animation: 5s ${pulseAnim} infinite;
`;

const WhiteBox2 = styled.div`
  margin: 2%;
  border: 2px solid black;
  border-radius: 20px;
  height: 12em;
  width: 12em;
  background-color: white;
  animation: 4s ${pulseAnim} infinite;
`;

const BtnContainer = styled.div`
  text-align: center;
  margin: 4% 0;
`;

const LinkBtn = styled(Button)`
  MuiButtonBase-root {
    padding: 5%;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 30vh;
  width: 30vw;
`;

// const Image = styled.img`
//   height: 80%;
//   width: 80%;
//   object-fit: contain;
// `;
