import React, { Component } from 'react';
import arrow from '../down-arrow.svg'

const postJson = [
    {
        id: 1,
        title: "Post Title",
        date: "5/nov/2020",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        img: "https://picsum.photos/id/7/300"
    },
    {
        id: 2,
        title: "Post Title",
        date: "5/nov/2020",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        img: "https://picsum.photos/id/4/500"
    },
    {
        id: 3,
        title: "Post Title 3",
        date: "5/nov/2020",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        img: "https://picsum.photos/id/3/600",
    }


]
class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            postTitle: "",
            postImg: "",
            postDescription: "",
            postDate: "",
            enableEdit:false,
            formActive : true,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlerCreateNewPost = this.handlerCreateNewPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleOpacityForm = this.handleOpacityForm.bind(this)
    }

    componentDidMount() {
    let localPosts = localStorage.getItem("posts");
    if (localPosts) {
      this.setState({
        posts: JSON.parse(localPosts),
      });
    } else {
      setTimeout(() => {
        localStorage.setItem("posts", JSON.stringify(postJson));
        this.setState({
          posts: postJson,
        });
      }, 3000);
    }
}

handleOpacityForm(){

    this.setState({formActive:!this.state.formActive})
}

handleSubmit(event) {
        event.preventDefault();
        let { posts, postDate, postDescription, postImg, postTitle, id } = this.state
        const newPost = {
            id,
            title: postTitle,
            date: postDate,
            description: postDescription,
            img: postImg,
        }
        let localPosts= JSON.parse(localStorage.getItem("posts"));
        localPosts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(localPosts));
        posts.push(newPost);
        this.setState({
            posts,
            postTitle: "",
            postImg: "",
            postDescription: "",
            postDate: "",
        });
    }
handlerCreateNewPost({ target: { value, name } }) {
        this.setState({
            [name]: value
        })
    }
handleEdit(title, date, description, img, id,){
        console.log(title,"hey ")
        this.setState({
            enableEdit:!this.state.enableEdit,
            postTitle:title,
            id,
            postDate:date,
            postDescription:description,
            postImg:img,
        })
        console.log(title)
    }
deletePost(id) {
        //id.preventDefault()
        const arrayActualizado = this.state.posts.filter(item => item.id !== id)
        this.setState({ posts: arrayActualizado })
        localStorage.setItem("posts", JSON.stringify(arrayActualizado));
    }
editPost(event){
        let { posts, postDate, postDescription, postImg, postTitle, id } = this.state
        const updatePost = {
            id,
            title: postTitle,
            date: postDate,
            description: postDescription,
            img: postImg,
        }
       
        event.preventDefault()
        console.log()
        const updatedPost = posts.map(item=>
            item.id === this.state.id ? updatePost:item)
            posts.push(updatedPost)
            console.log(updatedPost)
            this.setState({
                posts,
                postTitle: "",
                postImg: "",
                postDescription: "",
                postDate: "",
            })

    }
renderPosts() {
        return this.state.posts.map(({title, date, description, img, id, }) => {
            return (
                <div key={id} className={"card"}>
                    <picture>
                        <img src={img} alt="post-img" />
                    </picture>
                    <h3 >{title}</h3>
                    <p>{description}</p>
                    <div className={"date-container"}>
                    <span>Date created:</span>
                    <span>{date}</span>
                    </div>
                    <div className={"btn-container"}>
                        <button className={'warning'} 
                                onClick={()=>this.handleEdit(title, date, description, img, id,)}>
                                Editar
                                
                        </button>
                        <button className={'danger'} 
                         onClick={() => this.deletePost(id)}>Borrar
                         </button>
                    </div>
                </div>
            )
        })
    }

    renderForm() {
        const { postTitle, postImg, postDescription, postDate,enableEdit, formActive } = this.state;
        return (
            <>
            <form className={formActive  ? 'active':'inactive'} onSubmit={enableEdit ? this.editPost:this.handleSubmit}>
                    Post Title:{" "}
                    <br></br>
                    <input
                        value={postTitle}
                        onChange={this.handlerCreateNewPost}
                        name="postTitle"
                    />
                    <br></br>
          Img Url:{" "}
          <br></br>
                    <input
                        value={postImg}
                        onChange={this.handlerCreateNewPost}
                        name="postImg"
                    />
                    <br></br>
          post description :{" "}
          <br></br>
                    <input
                        value={postDescription}
                        onChange={this.handlerCreateNewPost}
                        name="postDescription"
                    />
                    <br></br>
          date created :{" "}
          <br></br>
                    <input
                        value={postDate}
                        onChange={this.handlerCreateNewPost}
                        name="postDate"
                    />

                    <br></br>
                    <button className={"primary"} type="submit">{enableEdit ? "Editar post":"Crear Post"}</button>
                </form>
            </>
        )
    }

    render() {
        const { posts,enableEdit,formActive } = this.state
        return (
            <>
                <div className={"card-container"}>
                    {posts.length !== 0 ? (this.renderPosts()) : (<h1>No hay posts nene</h1>)}
                </div>
                <div className={'create-post-container'}>
                <div className="title-container" onClick={()=>this.handleOpacityForm()}>
                <h2>{ enableEdit ? "Editar post":"Crear Post"}</h2>
                <picture>
                    <img className ={formActive ? 'rotateArrow':null} src={arrow} alt="arrow"/>
                </picture>
                </div>
                <div className={"form-container"}  >
                    {this.renderForm()}
                </div>
                </div>
            </>
        );
    }
}
export default Posts;