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

  onKeyPress = e => {
    if (e.which === 13) {
      this.SubmitSearch();
    }
  };

  render() {
    return (
      <SearchContainer>
        <InputContainer
          placeholder="Search posts"
          onKeyPress={this.onKeyPress}
          onChange={e => {
            this.setState({ searchInput: e.target.value });
          }}
        ></InputContainer>
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

const InputContainer = styled(InputBase)`
  border: 1px solid gray;
  padding: 0 1%;
    border-radius: 5px;
  &:hover {
    border: 1px solid black;
  }
  }
`;
