import React from "react";
import styled from "styled-components";
import { LandingCard } from "./LandingCard";

const LandingInfo = () =>{
    return(
        <div>
            <h3>Only three simple steps to share you secrets</h3>
            <Container>
                <LandingCard title="Think" description="Simply think of a secret that you have been dying to say but cannot because you are afraid of how other might think."/>
                <LandingCard title="Write" description="Write to your desire all your thoughts and pour it. You can stay anonymously and no one will know it."/>
                <LandingCard title="Share" description="Share your secret to everyone and let other people comments on it"/>
            </Container>
        </div>
    )
}

export {LandingInfo}

const Container = styled.div`
display:flex;
flex-direction: row;
`;