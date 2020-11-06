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
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handlerCreateNewPost = this.handlerCreateNewPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.editPost = this.editPost.bind(this)
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

    deletePost(id) {
        //id.preventDefault()
        const arrayActualizado = this.state.posts.filter(item => item.id !== id)
        this.setState({ posts: arrayActualizado })
    }
    editPost(){
        console.log("yes")
    }

    renderPosts() {
        return this.state.posts.map(({ title, date, description, img, id }) => {
            return (
                <div key={id} className={"card"}>
                    <picture>
                        <img src={img} alt="" />
                    </picture>
                    <h3 >{title}</h3>
                    <span>{date}</span>
                    <p>{description}</p>
                    <div className={"btn-container"}>
                        <button>Editar</button>
                        <button onClick={() => this.deletePost(id)}>Borrar</button>
                    </div>
                </div>
            )
        })
    }

    renderForm() {
        const { postTitle, postImg, postDescription, postDate } = this.state;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
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
                    <button type="submit">Crear Post</button>
                </form>
            </>
        )
    }

    render() {
        const { posts } = this.state
        return (
            <>
                <div className={"card-container"}>
                    {posts.length != 0 ? (this.renderPosts()) : (<h1>No hay posts nene</h1>)}
                </div>
                <div className={"form-container"}>
                    {this.renderForm()}
                </div>
            </>
        );
    }
}
export default Posts;