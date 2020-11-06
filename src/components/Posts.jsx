import React, { Component } from 'react';

const postJson = [
    {
        id:1,
        title:"Post Title",
        date:"5/nov/2020",
        description:"some description",
        img:"https://picsum.photos/id/7/300"
    },
    {
        id:2,
        title:"Post Title",
        date:"5/nov/2020",
        description:"some description",
        img:"https://picsum.photos/id/4/500"
    },
    {
        id:3,
        title:"Post Title 3",
        date:"5/nov/2020",
        description:"some description",
        img:"https://picsum.photos/id/3/600",
    }


]
class Posts extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <>
            {
                postJson.map((item,index) => 
                    <div key ={index} className={"card"}>
                        <img src={item.img} alt=""/>
                        <h3 >{item.title}</h3> 
                     <span>{item.date}</span>
                    <p>{item.description}</p>
                    </div>
                )
            }
            </>
        );
    }
}



export default Posts;