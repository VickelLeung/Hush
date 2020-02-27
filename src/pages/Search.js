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
import SearchBar from "../components/SearchBar";

class Search extends PureComponent {
  state = { param: "", userInfo: [], title: [], description: [] };

  componentDidMount = () => {
    this.getUrl();
  };

  //if url changed update it
  componentDidUpdate(prevProps) {
    if (this.props.match.params.param !== prevProps.match.params.param) {
      console.log("Route change!");
      this.getUrl();
    }
  }

  getUrl = () => {
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
        console.log(res[0]);
        console.log(res[1]);
        console.log(this.state.title);
        console.log(this.state.description);
      })
      .catch(err => console.log(err));

    console.log(this.state.userInfo);
  };

  reRenderState = () => {
    // this.getUrl();
    console.log("re-render");
  };

  render() {
    return (
      <Wrapper>
        <SearchBar onClick={this.reRenderState} />
        <MainWrapper>
          <h1>Your search results for: "{this.state.param}"</h1>
          <h1>Title:</h1>

          <CardContainer>
            {this.state.title.length != 0 ? (
              this.state.title.map(item => {
                return (
                  <LinkItem
                    to={"/categories/" + item.category + "/" + item._id}
                  >
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
              <p>
                No search found for <b>{this.state.param}</b> as title
              </p>
            )}
          </CardContainer>
          <h1>Description:</h1>

          <CardContainer>
            {this.state.description.length != 0 ? (
              this.state.description.map(item => {
                return (
                  <LinkItem
                    to={"/categories/" + item.category + "/" + item._id}
                  >
                    <CardItem>
                      <Typography variant="h3">{item.title}</Typography>
                      <Typography variant="h4">
                        From: {item.category}
                      </Typography>
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
              <p>
                No search founds for <b>{this.state.param}</b> as description
              </p>
            )}
          </CardContainer>
        </MainWrapper>
      </Wrapper>
    );
  }
}

export { Search };

const Wrapper = styled.div``;

const MainWrapper = styled.div`
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
