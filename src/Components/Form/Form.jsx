import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class Form extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleChange(key, e){
        this.setState({
            [key]: e.target.value
        })
    }

    addNew = async() => {
        let {title, img, content} = this.state
        await axios.post(`/api/post/new/`, {title, img, content})
        this.props.history.push('/dashboard')
    }

render(){
    return(
        <div className="form">
            <div className="content_box form_box">
                
                <h2 className="title">New Post</h2>
              <div className="form_input_box">
                    <p>Title:</p>
                    <input type="text"
                    onChange={(e) => this.handleChange('title', e)}
                    value={this.state.title}
                    />
                </div>
                    <h1> </h1>
                <div className="form_img_prev">
                    <img 
                    className='previmg'
                    src={this.state.img} alt="default img"/>
                </div>
                <div className="form_input_box">
                    <p>Image URL:</p>
                    <input 
                    onChange={(e) => this.handleChange('img', e)}
                    value={this.state.img}
                    type="text"/>
                </div>
                <div className="form_text_box">
                    <p>Content:</p>
                    <textarea name="" 
                    onChange={(e) => this.handleChange('content', e)}
                    value={this.state.content}
                    id="" cols="30" rows="10"></textarea>
                </div>
                <button 
                onClick={() => this.addNew()}
                className="form_button">
                    Post
                </button>
                
            </div>
            
        </div>
    )
}
}
function mapStateToProps(store) {  
    return{
        id: store.id
    }

    
    
}

export default connect(mapStateToProps)(Form)