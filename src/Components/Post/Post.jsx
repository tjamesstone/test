import React, {Component} from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'

 class Post extends Component{
    constructor(props){
        super(props)
        this.state ={
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    componentDidMount(){
        this.getOnePost()
    }

    getOnePost = async () => {
        
        const res = await axios.get(`/api/post/${this.props.match.params.postid}`)
        console.log(res)
        this.setState({
            title: res.data[0].title,
            img: res.data[0].img,
            content: res.data[0].content,
            username: res.data[0].username,
            profile_pic: res.data[0].profile_pic
        })
    }

render(){
    // const {title, img, content, username, profile_pic} = this.props
    
    return(
        <div className="post">
            <div className="postallinfo">
            <h1>{this.state.title}</h1>
                <img src={this.state.img} alt="" />
                <p>{this.state.content}</p>
            </div>
            <div className="content_box fullbox">
                
                <div className="banner">
                <h2>{this.state.title}title</h2>
                by: <h5>{this.state.username}username</h5>
                <img src={this.state.profile_pic} alt="profile"/>
                </div>
                <div className="thecontent">
                    <img src={this.state.img} alt="article"/>
                    <p>{this.state.content}test</p>
                </div>
                
                
                
            </div>

        </div>
    )
}
}
// function mapStateToProps(reduxState) {
//     const {id} = reduxState
//     return {id}
// }


export default Post