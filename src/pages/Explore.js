import React, { PureComponent } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { Element } from "react-scroll";
import ReactTooltip from "react-tooltip";

class Explore extends PureComponent {
  state = {
    categoryList: [],
    card: [],
    category: "",
    history: []
  };

  componentDidMount = () => {
    this.requestToBackend();
  };

  requestToBackend = () => {
    let category = this.getCategory();

    console.log(category);

    axios
      .get("https://hushbackend.herokuapp.com/post/" + category)
      .then(result => {
        console.log("s: " + result.data[0]);
        // let tempHistory = [];
        // tempHistory.push(result.data[0]);
        // console.log("temp " + tempHistory);

        this.setState({
          categoryList: result.data
        });
        this.getCard();
      })
      .catch(error => console.log(error));
    console.log("Hist: " + this.state.history);

    console.log("p: " + this.state.categoryList);
  };

  getCategory = () => {
    //generate random number
    let categoryNumber = Math.floor(Math.random() * 7) + 1;

    //console.log(categoryNumber);

    switch (categoryNumber) {
      case 1:
        this.setState({ category: "love" });
        return "love";

      case 2:
        this.setState({ category: "work" });
        return "work";

      case 3:
        this.setState({ category: "school" });
        return "school";

      case 4:
        this.setState({ category: "dating" });
        return "dating";

      case 5:
        this.setState({ category: "finance" });
        return "finance";

      case 6:
        this.setState({ category: "family" });
        return "family";

      case 7:
        this.setState({ category: "miscellaneous" });
        return "miscellaneous";
    }
  };

  getCard = () => {
    let randNum = Math.floor(Math.random() * this.state.categoryList.length);
    console.log("getcard num : " + randNum);
    let tempArr = [];
    tempArr.push(this.state.categoryList[randNum]);
    this.setState({
      card: tempArr,
      history: [...this.state.history, this.state.categoryList[randNum]]
    });
    console.log("l: " + this.state.card);
  };

  nextExplore = () => {
    this.requestToBackend();
  };

  render() {
    return (
      <div>
        <p>Explore page</p>
        <SearchBar />
        <h3>Category : {this.state.category}</h3>

        <MainContainer>
          <CardContainer>
            {this.state.card.map((res, index) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/categories/" + res.category + "/" + res._id}
                >
                  <Card
                    key={index}
                    style={{
                      border: "1px solid black",
                      padding: "6% 8%",
                      margin: "4%"
                    }}
                    variant="outlined"
                  >
                    <div>
                      <Typography variant="h3">{res.title}</Typography>

                      <Typography variant="h4">From: {res.user}</Typography>
                      <Typography variant="h5">{res.date}</Typography>
                      <Typography variant="h5">{res.description}</Typography>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </CardContainer>

          {/* Keep a history of posts */}
          <HistoryContainer>
            <h1>Previous explored</h1>
            <Bar />
            <Element
              style={{
                position: "relative",
                height: "40vh",
                overflow: "scroll"
              }}
            >
              {this.state.history.map((item, index) => {
                return (
                  <Link to={"/categories/" + item.category + "/" + item._id}>
                    <div key={index}>
                      <p data-tip={item.description}>
                        {index}: {item.title}
                      </p>
                      <ReactTooltip />
                    </div>
                  </Link>
                );
              })}
            </Element>
          </HistoryContainer>
        </MainContainer>

        <ExploreBtn variant="outlined" onClick={this.nextExplore}>
          Explore another posts
        </ExploreBtn>
      </div>
    );
  }
}

export { Explore };

const ExploreBtn = styled(Button)``;
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const HistoryContainer = styled.div`
  border: 1px solid black;
  width: 30vw;
`;

const CardContainer = styled.div`
  width: 70vw;
`;

const Bar = styled.div`
  border-bottom: 1px solid black;
  margin: 0 5%;
`;

// <Element style={{
//   position: 'relative',
//   height: '70vh',
//   overflow: 'scroll',
// }}>
//   <Element name="firstInsideContainer" style={{
//   }}>
//      <section ref={(section) => { this.people = section; }}>
//       <People />
//     </section>
//   </Element>

//   <Element name="secondInsideContainer" style={{

//   }}>
//    <section ref={(section) => { this.planet = section; }}>
//     <Planet />
//   </section>
//   </Element>
//   <Element name="secondInsideContainer" style={{

//   }}>
//     <section ref={(section) => { this.starship = section; }}>
//     <Starship />
//   </section>
//   </Element>
// </Element>
