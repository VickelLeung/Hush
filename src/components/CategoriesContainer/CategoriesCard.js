import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";
import axios from "axios";
import {Link} from "react-router-dom";
import {  Route } from 'react-router-dom'
import {one} from "../../images/backgroundImages";
import img from "../../images/backgroundImages/test.jpg"
import bgImg from "../../images/backgroundImages/motoki-tonn-vV1a1Leq-dQ-unsplash.jpg";

class CategoriesCard extends Component{

  state={
    card: [],
    picture: "",
    numberOfCards: 0
  }

  generateRandomImage = () =>{
    //generate a random number

    //set it as state
    this.setState({numberOfCards: this.state.card.length})
  }

  componentDidMount=()=>{
    this.getCard();
  }
  
  getCard=()=>{
    axios.get('https://hushbackend.herokuapp.com//post/'+ this.props.type)
    .then((result)=>{
      console.log(result.data)
      this.setState({card: result.data})
    });
  }

render(){

    return(
        <div>
          <MainTitle>{this.props.name}</MainTitle>
          <Container>
            {this.state.card.map((res)=>{

            return  <LinkItem to= {this.props.type +"/"+res._id}>

              <Card style={{border:"1px solid black", padding:"6% 8%", margin:"4%", }} variant="outlined">
                <CardItem>
                  <Typography variant="h3">{res.title}</Typography>
            
                  <Typography variant="h4">From: {res.user}</Typography>
                  <Typography variant="h5">{res.date}</Typography>
                  <Typography variant="h5">{res.description}</Typography>
                </CardItem>
              </Card>

              </LinkItem>
        
         })}

          </Container>
        </div>
    )
 }
}

export {CategoriesCard};

const Container = styled.div`
display: flex;
flex-wrap: wrap;
margin: 0 4%;
`;

const MainTitle = styled.div`
font-size: 2em;
text-align:center;
color:white;
padding: 2%;
background:linear-gradient(0deg, rgba(124,123,123,0) 0%, rgba(0,0,0,0.10547969187675066) 0%, rgba(0,0,0,0.5872724089635855) 0%, rgba(0,0,0,1) 100%);
`;

const LinkItem = styled(Link)`
text-decoration:none;
color:black;
flex: 0 0 50%;

&:hover{
  opacity: 0.4;
}
`;

const CardItem = styled.div`

`;
// background-image: url("https://images.unsplash.com/photo-1546273735-bea2e41924f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=935&q=80");
//object-fit: contain;