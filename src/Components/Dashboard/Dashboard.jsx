import React, {Component} from 'react'
import axios from 'axios'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import Post from '../Post/Post'

class Dashboard extends Component{
    constructor(props){
        super(props) 
        this.state = {
            searchInput: '',
            userPosts: true,
            posts: []
        }
    }
    componentDidMount(){
        this.getPosts()
    }

    handleChange(key, e){
        this.setState({
            [key]: e.target.value
        })
    }

    myPostsChange = e => {
        this.setState(prevState => ({
            userPosts: !prevState.userPosts 
        }))
    }
    
    getPosts = async () => {
        const res = await axios.get(`/api/posts/?userposts=${this.state.userPosts}&search=${this.state.searchInput}`)
        this.setState({
            posts: res.data
        })
    }

    resetSearch(){
        this.setState({searchInput: ''})
        this.getPosts()
    }

render(){
    const {posts} = this.state
    return(
        <div className="dashboard">
            <div className="content_box dash_filter">
                <div className="searchbar">
                    <input 
                    onChange={e => this.handleChange('searchInput', e)}
                    value={this.state.searchInput}
                    className='searchinput'
                    placeholder='Search By Title'
                    type="text"/>
                    <img 
                    onClick={() => this.getPosts()}
                    className='searchimg'
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC" alt="search"/>
                    <button
                    onClick={() => this.resetSearch()}
                    className='searchbutton'
                    >Reset</button>
                </div>
                <div className="userPosts">
                    <p>My Posts</p>
                    <input type="checkbox"
                    checked={this.state.userPosts}
                    onChange={e => this.myPostsChange(e)}
                    />
                </div>
            </div>
            <div className="content_box dash_posts_container">
                {posts.map(post => (
                    <Link key={post.post_id} to={`/post/${post.post_id}`}>
                            <div className="content_box minipost">
                                <h3>{post.title}</h3>
                                <div className="leftcontainer">
                                <h5>by: {post.username}</h5>
                                <img 
                                className='dashimg'
                                src={post.profile_pic} alt="profile"/>
                                </div>
                            </div>
                    </Link>
                ))}
               
            </div>
        </div>
    )
}
}
// function mapStateToProps(reduxState) {
//     const {id} = reduxState
//     return {id}
// }


export default Dashboard