import React, { PureComponent } from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import { withRouter } from "react-router-dom";

class SearchBar extends PureComponent {
  state = {
    searchInput: ""
  };

  SubmitSearch = () => {
    console.log("tet");
    this.props.history.push({
      pathname: "/search/" + this.state.searchInput
    });
  };

  render() {
    return (
      <SearchContainer>
        <InputBase
          placeholder="Search posts"
          onChange={e => {
            this.setState({ searchInput: e.target.value });
          }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon onClick={this.SubmitSearch} />
        </IconButton>
      </SearchContainer>
    );
  }
}

export default withRouter(SearchBar);

const SearchContainer = styled.div`
  text-align: right;
  margin: 2%; 10%;

`;
