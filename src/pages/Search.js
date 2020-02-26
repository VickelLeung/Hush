import React, { PureComponent } from "react";
// import axios from "axios";
import { searchInput } from "../components/UserFunctions";
// import Card from '@material-ui/core/Card';
// import Typography from '@material-ui/core/Typography';

class Search extends PureComponent {
  state = { userInfo: [], title: [], description: [] };

  componentDidMount = () => {
    // let getProps = this.props.location.state.input;
    let getProps = this.props.match.params.param;

    console.log("getProps: " + getProps);
    searchInput(getProps)
      .then(res => {
        this.setState({
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
      <div>
        <h1>Here are your search results</h1>
        <h1>Title:</h1>
        <div>
          {this.state.title.map(item => {
            return <p>{item.title}</p>;
          })}
        </div>
      </div>
    );
  }
}

// {this.state.title.map(item => {
//   return (
//     <div>
//       <p>{item.title}</p>
//       <p>{item.category}</p>
//       <p>{item.description}</p>
//       <p>{item.user}</p>
//     </div>
//   );
// })}

export { Search };
