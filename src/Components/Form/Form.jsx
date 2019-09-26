import React, {Component} from 'react'

export default class Form extends Component{


render(){
    return(
        <div className="form">
            <div className="content_box form_box">
                
                <h2 className="title">New Post</h2>
              <div className="form_input_box">
                    <p>Title:</p>
                    <input type="text"/>
                </div>
                    <h1> </h1>
                <div className="form_img_prev">
                    <img src="" alt=""/>
                </div>
                <div className="form_input_box">
                    <p>Image URL:</p>
                    <input type="text"/>
                </div>
                <div className="form_text_box">
                    <p>Content:</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <button className="form_button">
                    Post
                </button>
                
            </div>
            
        </div>
    )
}
}