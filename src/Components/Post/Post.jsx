import React, {Component} from 'react'

export default class Post extends Component{
    constructor(props){
        super(props)
        this.state ={
            id: 0,
            title: '',
            img: '',
            content: '',
            author_id: ''
        }
    }

render(){
    const {id, title, img, content, author_id} = this.props
    
    return(
        <div className="post">
            <div className="content_box">
                Post
            </div>
        </div>
    )
}
}