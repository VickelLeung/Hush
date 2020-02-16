import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage';
import {Chat} from "./pages/Chat";
import {Profile} from './pages/Profile';
import {Authenticate} from './pages/Authenticate';
import {NavigationBar } from './components/navigation/NavigationBar';
import {CreatePost} from "./components/CreatePost";
import {Categories} from './pages/Categories';
import {CategoriesCard} from "./components/CategoriesContainer/CategoriesCard";
import {Explore} from "./pages/Explore";
import {PostCard} from "./components/Card/PostCard";
 

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
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/authenticate" component={Authenticate} />
            <Route exact path="/createpost" component={CreatePost} />

            <Route exact path="/categories/love" component={()=><CategoriesCard type="love" name="Love"/>} />
            <Route exact path="/categories/employment" component={()=><CategoriesCard type="employment" name="Employment"/>} />
            <Route exact path="/categories/family" component={()=><CategoriesCard type="family" name="Family"/>} />
            <Route exact path="/categories/school" component={()=><CategoriesCard type="school" name="School"/>} />
           
            <Route path="/categories/love/:id" component={(props)=><PostCard  {...props}/>} />
           
         
      </div>
    </Router>
  );
}

export default App;
