import React, { Component } from 'react';

const postJson = [
    {
        id: 1,
        title: "Post Title",
        date: "5/nov/2020",
        description: "some description",
        img: "https://picsum.photos/id/7/300"
    },
    {
        id: 2,
        title: "Post Title",
        date: "5/nov/2020",
        description: "some description",
        img: "https://picsum.photos/id/4/500"
    },
    {
        id: 3,
        title: "Post Title 3",
        date: "5/nov/2020",
        description: "some description",
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
            enableEdit:false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlerCreateNewPost = this.handlerCreateNewPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }

    componentDidMount() {
        this.setState({
            posts: postJson,
        })
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
        posts.push(newPost)

        this.setState({
            posts,
            postTitle: "",
            postImg: "",
            postDescription: "",
            postDate: "",
        })
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
                    <span>{date}</span>
                    <p>{description}</p>
                    <div className={"btn-container"}>
                        <button onClick={()=>this.handleEdit(title, date, description, img, id,)}>Editar</button>
                        <button onClick={() => this.deletePost(id)}>Borrar</button>
                    </div>
                </div>
            )
        })
    }

    renderForm() {
        const { postTitle, postImg, postDescription, postDate,enableEdit } = this.state;
        return (
            <>
                
                <form onSubmit={enableEdit ?this.editPost:this.handleSubmit}>
                    Post Title:{" "}
                    <input
                        value={postTitle}
                        onChange={this.handlerCreateNewPost}
                        name="postTitle"
                    />
                    <br></br>
          Img Url:{" "}
                    <input
                        value={postImg}
                        onChange={this.handlerCreateNewPost}
                        name="postImg"
                    />
                    <br></br>
          post description :{" "}
                    <input
                        value={postDescription}
                        onChange={this.handlerCreateNewPost}
                        name="postDescription"
                    />
                    <br></br>
          date created :{" "}
                    <input
                        value={postDate}
                        onChange={this.handlerCreateNewPost}
                        name="postDate"
                    />

                    <br></br>
                    <button type="submit">{enableEdit ? "Editar post":"Crear Post"}</button>
                </form>
            </>
        )
    }

    render() {
        const { posts,enableEdit } = this.state
        return (
            <>
                <div className={"card-container"}>
                    {posts.length !== 0 ? (this.renderPosts()) : (<h1>No hay posts nene</h1>)}
                </div>
                <h2>{ enableEdit ? "Editar post":"Crear Post"}</h2>
                <div className={"form-container"}>
                    {this.renderForm()}
                </div>
            </>
        );
    }
}
export default Posts;