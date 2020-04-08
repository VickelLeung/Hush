import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { withRouter } from "react-router";
import Homepage from "./pages/Homepage";
import { Chat } from "./pages/Chat";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { NavigationBar } from "./components/navigation/NavigationBar";
import CreatePost from "./components/CreatePost";
import Categories from "./pages/Categories";
import { CategoriesCard } from "./components/CategoriesContainer/CategoriesCard";
import { Explore } from "./pages/Explore";
import { Search } from "./pages/Search";
import { PostCard } from "./components/Card/PostCard";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { resetPassword } from "./components/UserFunctions";

function App() {
  return (
    <Router>
      <NavigationBar />
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

        <Route
          exact
          path="/categories/love"
          component={() => <CategoriesCard type="love" name="Love" />}
        />
        <Route
          exact
          path="/categories/employment"
          component={() => (
            <CategoriesCard type="employment" name="Employment" />
          )}
        />
        <Route
          exact
          path="/categories/family"
          component={() => <CategoriesCard type="family" name="Family" />}
        />
        <Route
          exact
          path="/categories/school"
          component={() => <CategoriesCard type="school" name="School" />}
        />
        <Route
          exact
          path="/categories/work"
          component={() => <CategoriesCard type="work" name="Work" />}
        />
        <Route
          exact
          path="/categories/dating"
          component={() => <CategoriesCard type="dating" name="Dating" />}
        />
        <Route
          exact
          path="/categories/finance"
          component={() => <CategoriesCard type="finance" name="Finance" />}
        />

        <Route
          exact
          path="/categories/miscellaneous"
          component={() => (
            <CategoriesCard type="miscellaneous" name="Miscellaneous" />
          )}
        />

        <Route
          path="/categories/love/:id"
          component={(props) => <PostCard {...props} />}
        />
      </div>
    </Router>
  );
}

export default App;
