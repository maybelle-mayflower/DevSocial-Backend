import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


const AddComment = ({addComment, post}) => {

    const [text, setText] = useState('');

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                addComment(post._id, { text });
                setText('');
            }}
             className="form my-1">
            <textarea value={text} onChange={e=>setText(e.target.value)}
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required>
            </textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

AddComment.propTypes = {
    addComment : PropTypes.func.isRequired,
}

export default connect(null, {addComment})(AddComment);
