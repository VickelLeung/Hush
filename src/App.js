import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { withRouter } from "react-router";
import Homepage from "./pages/Homepage";
import { Chat } from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { NavBar } from "./components/navigation/NavigationBar";
import CreatePost from "./components/CreatePost";
import Categories from "./pages/Categories";
import { CategoryCards } from "./components/CategoriesContainer/CategoriesCard";
import { Explore } from "./pages/Explore";
import { Search } from "./pages/Search";
import { PostCard } from "./components/Card/PostCard";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { resetPassword } from "./components/UserFunctions";

function App() {
  let categoriesName = [
    {
      name: "Love",
      category: "love",
    },
    {
      name: "Employment",
      category: "employment",
    },
    {
      name: "Family",
      category: "family",
    },
    {
      name: "School",
      category: "school",
    },
    {
      name: "Work",
      category: "work",
    },
    {
      name: "Dating",
      category: "dating",
    },
    {
      name: "Finance",
      category: "finance",
    },
    {
      name: "Miscellaneous",
      category: "miscellaneous",
    },
  ];

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Homepage} />
      <div className="App">
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/profile" component={Profile} />

        <span>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </span>

        <Route exact path="/forgotten_password" component={ForgotPassword} />
        <Route exact path="/reset_password/:id" component={ResetPassword} />
        <Route exact path="/createpost" component={CreatePost} />
        <Route exact path="/search/:param" component={Search} />

        {categoriesName.map((item, idex) => {
          return (
            <Route
              exact
              path={"/categories/" + item.category}
              component={() => (
                <CategoryCards type={item.category} name={item.name} />
              )}
            />
          );
        })}

        {categoriesName.map((items, index) => {
          return (
            <Route
              keys={index}
              path={"/categories/" + items.category + "/:id"}
              component={(props) => <PostCard {...props} />}
            />
          );
        })}
      </div>
    </Router>
  );
}

export default App;