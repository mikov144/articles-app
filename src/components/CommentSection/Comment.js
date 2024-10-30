// src/components/Comment.js
import React, { useState } from 'react';

const Comment = ({ comment }) => {
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    // Ensure replies array exists
    const updatedComment = { ...comment, replies: comment.replies || [] };

    const newReply = {
      id: updatedComment.replies.length + 1,
      content: reply,
      author: {
        username: 'current_user' // Replace with actual current user
      }
    };

    updatedComment.replies.push(newReply);
    setReply('');
    setShowReplyBox(false);
  };

  return (
    <div className="comment">
      <p><strong>{comment.author.username}</strong>: {comment.content}</p>
      <button onClick={() => setShowReplyBox(!showReplyBox)}>Reply</button>
      {showReplyBox && (
        <div className="reply-input">
          <textarea
            value={reply}
            onChange={handleReplyChange}
            placeholder="Add a reply..."
          />
          <button onClick={handleReplySubmit}>Post</button>
        </div>
      )}
      <div className="replies">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="reply">
            <p><strong>{reply.author.username}</strong>: {reply.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;

