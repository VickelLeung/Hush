import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { LandingInfo } from "../components/LandingInformation/LandingInfo";
import { Button } from '@material-ui/core';

const Homepage=()=>{
    return(
        <Wrapper>
            <MainContainer>
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
                              
            </InfoContainer>
        </Wrapper>
    )
}

export {Homepage};

const Wrapper = styled.div`
text-align:center;
display: flex;
align-items: center;
flex-direction: column;
`;

const LinkButton = styled(Link)`
text-decoration:none;
`;

const LandingContainer = styled.div`
margin-bottom: 3%;
`;

const MainContainer = styled.div``;

const InfoContainer = styled.div``;

const Title = styled.h2`
text-decoration: underline;
`;

const SubTitle = styled.div`
font-size: 1.5em;
margin-bottom: 2%;
`;

const Description = styled.div`
display:flex;
align-items:center;
justify-content:center;
text-align:center;
margin: 2% 10%;
padding: 1%;
font-size: 1.2em;

box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
`;

const CreateContainer = styled.div`
margin: 4% 10%;
padding: 2%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;

const Bar = styled.div`
border-bottom: 2px solid black;
margin: 4% 10%;

`;