import React, { PureComponent } from 'react';
import axios from "axios";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

class Explore extends PureComponent{

    state = {
        categoryList : [],
        card : [],
        category: ""
    }

    componentDidMount=()=>{

      let category = this.getCategory(); 

        console.log(category);

        // let id  = this.props.match.params.id;
        // console.log(id);
        axios.get('https://hushbackend.herokuapp.com/post/' + category)
        .then((result)=>{
        //   let tempArr = result.data[0].comment;
          console.log("s: "+ result.data[0]);
          this.setState({categoryList: result.data })
          this.getCard();
        })
        .catch((error)=> console.log(error));

        console.log("p: " + this.state.categoryList);

    }

    getCategory = () =>{
    //generate random number
    let categoryNumber = Math.floor(Math.random() * 7)+1;

    //console.log(categoryNumber);

    switch(categoryNumber){
     case 1 : this.setState({category: "love"}); return "love";
    
     case 2 : this.setState({category: "work"}); return "work";

     case 3 : this.setState({category: "school"}); return "school";
       
     case 4 : this.setState({category: "dating"}); return "dating";
        
     case 5 : this.setState({category: "finance"}); return "finance";
         
     case 6 : this.setState({category: "family"}); return "family";
        
     case 7 : this.setState({category: "miscellaneous"}); return "miscellaneous";
        
        }
    }

    getCard = () =>{
        let randNum = Math.floor(Math.random() * this.state.categoryList.length );
        console.log("getcard num : " + randNum);
        let tempArr = [];
        tempArr.push(this.state.categoryList[randNum]);
        this.setState({card : tempArr })
        console.log("l: "+this.state.card);
    }

    render(){
        return(<div>

            <p>Explore page</p>
        <h3>Category : {this.state.category}</h3>

           {this.state.card.map((res, index)=>{
               return <Card key={index} style={{border:"1px solid black", padding:"6% 8%", margin:"4%", }} variant="outlined">
               <div>
                 <Typography variant="h3">{res.title}</Typography>
           
                 <Typography variant="h4">From: {res.user}</Typography>
                 <Typography variant="h5">{res.date}</Typography>
                 <Typography variant="h5">{res.description}</Typography>
               </div>
             </Card>

           })}

           
        </div>);
    }
}

export {Explore}

// title:{type:String, require:true},
//     user:{type:String, require:true},
//     category:{type: String, require:true},
//     description:{type:String, require:true},
//     date: {type: Date, require:true},
//     comment: [commentSchema]