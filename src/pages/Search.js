import React, { PureComponent } from "react";
// import axios from "axios";
import { searchInput } from "../components/UserFunctions";
// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';
import Highlighter from "react-highlight-words";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Redirect } from "react-router";

class Search extends PureComponent {
  state = { param: "", userInfo: [], title: [], description: [] };

  componentDidMount = () => {
    let getProps = this.props.match.params.param;

    console.log("getProps: " + getProps);
    searchInput(getProps)
      .then(res => {
        this.setState({
          param: getProps,
          userInfo: res,
          title: res[0],
          description: res[1]
        });
        console.log(res[1]);
        console.log(this.state.title);
        console.log(this.state.description);
      })
      .catch(err => console.log(err));

    console.log(this.state.userInfo);

    //extract title array
  };

  render() {
    return (
      <Wrapper>
        <h1>Your search results for: "{this.state.param}"</h1>
        <h1>Title:</h1>

        <CardContainer>
          {this.state.title ? (
            this.state.title.map(item => {
              return (
                <LinkItem to={"/categories/" + item.category + "/" + item._id}>
                  <CardItem>
                    <Typography variant="h3">
                      <Highlighter
                        searchWords={[this.state.param]}
                        textToHighlight={item.title}
                      />
                    </Typography>
                    <Typography variant="h4">
                      Category: {item.category}
                    </Typography>
                    <Typography variant="h4">From: {item.user}</Typography>
                    <Typography variant="h5">{item.date}</Typography>
                    <Typography variant="h5">{item.description}</Typography>
                  </CardItem>
                </LinkItem>
              );
            })
          ) : (
            <p>No search founds with title</p>
          )}
        </CardContainer>
        <h1>Description</h1>

        <CardContainer>
          {this.state.description ? (
            this.state.description.map(item => {
              return (
                <LinkItem to={"/categories/" + item.category + "/" + item._id}>
                  <CardItem>
                    <Typography variant="h3">{item.title}</Typography>
                    <Typography variant="h4">From: {item.category}</Typography>
                    <Typography variant="h4">From: {item.user}</Typography>
                    <Typography variant="h5">{item.date}</Typography>
                    <Typography variant="h5">
                      <Highlighter
                        searchWords={[this.state.param]}
                        textToHighlight={item.description}
                      />
                    </Typography>
                  </CardItem>
                </LinkItem>
              );
            })
          ) : (
            <p>No search founds with description</p>
          )}
        </CardContainer>
      </Wrapper>
    );
  }
}

export { Search };

const Wrapper = styled.div`
  text-align: left;
  margin: 0 25%;
`;

const CardContainer = styled.div``;

const CardItem = styled(Card)`
  margin: 5% 0;
  padding: 4%;
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: black;
  flex: 0 0 50%;

  &:hover {
    background: rgba(0, 0, 0, 1);
    color: red;
  }
`;
