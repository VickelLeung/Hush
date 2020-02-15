import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
// import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { Select } from 'antd';

import axios from "axios";

class CreatePost extends Component{

    state={
        title:"",
        user:"",
        category:"",
        description:"",
        checked:"a",
        isModal:false,
        linkID:""
    }

    submit =()=>{
        let username ="";
        if(this.state.checked === 'a'? username='Anonymous' : username=this.state.user);
            
        const post = {user:username, title:this.state.title, category: this.state.category, description: this.state.description, date: new Date().toDateString()}
        console.log("submit...");
        if(this.state.title && this.state.category && this.state.description){
            axios.post("http://localhost:3001/post/add", post)
            .then(response => { 
                console.log(response.data);  
                console.log("id:" + response.data.id)
                //set link
                this.setState({linkID: response.data});
            })
            .catch(err => console.log(err));
            this.resetContent();
            this.displayModal();
        }
    }

    displayModal=()=>{
        //display modal
        this.setState({isModal: true});
    }

    resetContent=()=>{
         //reset all state
         this.setState({title:"", user:"", category:"", description:"", checked:"a"});
    }

     handleChange=(event)=> {
         console.log("event" + event.target.value);
        this.setState({category: event.target.value});
      }
    
render(){
    return(
        <Wrapper>
            <Title>Share you secret by filling up the form!</Title>
            <form>
           
            <FormContainer>
                <LabelText>Write a title</LabelText>
                <TextField
                id="standard-multiline-static"
                onChange={(e)=>this.setState({title: e.target.value})}
                />
                <LabelText>Choose a categories</LabelText>
                <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          onChange={this.handleChange}
        >
          <MenuItem value={"love"}>Love</MenuItem>
          <MenuItem value={"work"}>Work</MenuItem>
          <MenuItem value={"school"}>School</MenuItem>
          <MenuItem value={"dating"}>Dating</MenuItem>
          <MenuItem value={"finance"}>Finance</MenuItem>
          <MenuItem value={"family"}>Family</MenuItem>
        </Select>
                <LabelText>Share your secret below</LabelText>
                <TextField
                id="standard-multiline-static"
                multiline
                rows="4"
                onChange={(e)=> this.setState({description: e.target.value})}
                />
                <LabelText>Stay anonymous?</LabelText>
                <div>
                    <Label>Yes</Label>
                    <Radio
                    checked={this.state.checked === 'a'}
                    onChange={(e) => {this.setState({checked: 'a'})} }
                    value="a"
                    color="default"
                    name="radio-button-demo"
                  
                    />
                    <Label>No</Label>
                    <Radio
                        checked={this.state.checked === 'b'}
                        onChange={(e) => {this.setState({checked: 'b'})} }
                        value="b"
                        color="default"
                        name="radio-button-demo"
                      
                    /> 

                    {this.state.checked === 'b'? 
                    <div>
                        <Label>Write a name or username: </Label>
                        <TextField
                        id="standard-multiline-static"
                        onChange={(e)=>this.setState({user: e.target.value})}
                        />
                    </div> 
                    : null}
                </div>

                <Button onClick={this.submit}>Submit</Button>
                   </FormContainer>
                   
                        <Dialog
                        open={this.state.isModal}
                        onClose={this.state.isModal}
                      >
                          <DialogTitle id="alert-dialog-title">{"Sucess!"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Your post have been successfully posted under the categorie: {this.state.category}!
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                {/* Add link to post? */}
                            <Button onClick={()=>{this.setState({isModal:false})}} color="primary" autoFocus>
                                Done
                            </Button>
                            </DialogActions>
                      </Dialog>
                   
            </form>
        </Wrapper>
    )
 }
}

export {CreatePost};

const Wrapper = styled.div`
margin: 3% 0;
`;

const FormContainer = styled.div`
display:flex;
flex-direction:column;
margin: 0 20%;
`;

const Label = styled.label`
margin: 5% 0;
`;

const Title = styled.h2`
text-align:center;
`


const LabelText = styled(Label)`
font-size: 1.2em;
font-weight:bold;
`