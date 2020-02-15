import React from "react";
import styled from "styled-components";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const LandingCard = (props) =>{
    return(
        <Wrapper>
            <CardItem >
                <CardHeader
                title={props.title}
            />
            <CardMedia
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="h2">
                    {props.description}
                </Typography>
            </CardContent>
        </CardItem>
        </Wrapper>
    )
}

export {LandingCard}

const Wrapper = styled.div`
    width:100%;
`;

const CardItem = styled(Card)`

.MuiCard-root{
    margin: 0 2%;
}
`;