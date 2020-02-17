import React from "react";
import {CategoriesCard} from '../components/CategoriesContainer/CategoriesCard';
import {Link} from 'react-router-dom';
import styled from "styled-components";
// import {  Route } from 'react-router-dom/'

const Categories = () =>{
  

    let linkObj = [
        {name:"Love", link:"/categories/love", color:"black", hoverColor:"white"},
        {name:"Work", link:"/categories/work"},
        {name:"School", link:"/categories/school"},
        {name:"Dating", link:"/categories/dating"},
        {name:"Finance", link:"/categories/finance"},
        {name:"Family", link:"/categories/family"},
        {name:"Miscellaneous", link:"/categories/miscellaneous"}
]

    return(
        <Wrapper>
            <LinkContainer>
                {linkObj.map((item)=>{
                return  <LinkBtn 
                to={item.link}>
                    {item.name}
                </LinkBtn>
                })}
            </LinkContainer>
        </Wrapper>
    )
}

export {Categories};

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
`;

const LinkBtn = styled(Link)`
    text-align:center;
    flex: 0 0 20%; 
    text-decoration:none;
    color:black;
    border: 2px solid black;
    padding: 3%;
    margin: 1%;

    -webkit-transition: background 1s; /* For Safari 3.0 to 6.0 */
    transition: background 1s; /* For modern browsers */

    &:hover {
        background: black;
        color: white;
    }
`;

const LinkContainer = styled.div`
display:flex;
flex-wrap: wrap;
align-items: center;
justify-content:center;
`;