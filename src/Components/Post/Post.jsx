import React, {Component} from 'react'
import axios from 'axios'

export default class Post extends Component{
    constructor(props){
        super(props)
        this.state ={
            id: 0,
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    // componentDidMount(){
    //     this.getPost()
    // }

    // getPost = async () => {
    //     const {postId} = this.props.match.params
    //     const postInfo = await axios.get(`/api/post/${postId}`)
    //     const {title, img, profile_pic, username } = postInfo.data[0]
    //     this.setState({
    //         title, img, content: this.state.content , profile_pic, username
    //     })
    // }

render(){
    const {title, img, content, username, profile_pic} = this.props
    
    return(
        <div className="post">
            <div className="postallinfo">
            <h1>{title}</h1>
                <img src={img} alt="" />
                <p>{content}</p>
            </div>
            <div className="content_box">
                <h2>{title}</h2>
                <h2>{username}</h2>
                <img src={profile_pic} alt=""/>
            </div>

        </div>
    )
}
}