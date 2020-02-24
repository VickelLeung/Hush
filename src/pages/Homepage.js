import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { LandingInfo } from "../components/LandingInformation/LandingInfo";
import { Button } from "@material-ui/core";
import { bounce } from "react-animations";
import { bounceInUp } from "react-animations";
import { bounceInDown } from "react-animations";
import { pulse } from "react-animations";

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
      </TitleContainer>

      <FirstBox></FirstBox>

      <SecondBox></SecondBox>

      {/* <MainContainer>
            <Title>Welcome to Hush</Title>
            <Description>
            Have you ever wanted to express your secrets but could not because you did not want others to know? Well Hush is an 
            application to help you fufill your need with sharing any secrets to the world.
            <br />
            We can ensure that all your secret share with us will be anonymously and you can also discover other people secrets to your benefits.
            </Description>
           </MainContainer>
            <InfoContainer>
                <Bar />
                    <CreateContainer>
                        <SubTitle>Share you idea, secret, or anything to the world!</SubTitle>
                        <LinkButton to="/createpost"><Button variant="outlined">Start sharing now</Button></LinkButton>
                    </CreateContainer>  
                <Bar />
                    <LandingContainer>
                        <LandingInfo />
                    </LandingContainer>
                              
            </InfoContainer> */}
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

const TitleContainer = styled.div``;
const SubTitle = styled.div`
  font-size: 1.3em;
`;

const bounceAnimation = keyframes`${bounce}`;
const bounceUpAnim = keyframes`${bounceInUp}`;
const bounceDownAnim = keyframes`${bounceInDown}`;
const pulseAnim = keyframes`${pulse}`;

const FirstBox = styled.div`
  margin-top: 25%;
  border-radius: 20px;
  height: 20em;
  width: 20em;
  background-color: #555;

  animation: 2s ${pulseAnim} infinite;
`;

const SecondBox = styled.div`
  margin-bottom: 25%;
  border: 2px solid black;
  border-radius: 20px;
  height: 20em;
  width: 20em;
  background-color: white;
  animation: 3s ${pulseAnim} infinite;
`;
