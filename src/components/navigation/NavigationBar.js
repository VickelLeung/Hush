import React from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";

const NavigationBar = () =>{
    return(
    <Wrapper>
         <LinkItem to="/">Home </LinkItem>
         <LinkItem to="/chat">Chat </LinkItem>
         <LinkItem to="/explore">Explore </LinkItem>
         <LinkItem to="/categories">Categories</LinkItem>
         <LinkItem to="/createpost">Post secrets</LinkItem>
         <LinkItem to="/register">Register</LinkItem>
    </Wrapper>)
}

export {NavigationBar}

const Wrapper = styled.div`
    padding: 2% 0;
    text-align:center;
    background-color:black;
`;

const LinkItem = styled(Link)`
    margin: 0 2%;
    text-decoration:none;
    color:white;
`;