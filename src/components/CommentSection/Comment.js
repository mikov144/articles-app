// src/components/Comment.js
import React, { useState } from 'react';
import { getCurrentUser } from '../../services/authService';
import { CommentWrapper } from './comment.styled';

const Comment = ({ comment }) => {
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const username = getCurrentUser()

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
        username: username
      }
    };

    updatedComment.replies.push(newReply);
    setReply('');
    setShowReplyBox(false);
  };

  return (
    <CommentWrapper>
      <p className='comment__message'><strong>{comment.author.username}</strong>: {comment.content}</p>
      <button onClick={() => setShowReplyBox(!showReplyBox)} className='comment__button'>Ответить</button>
      {showReplyBox && (
        <div className="reply-input">
          <textarea
            value={reply}
            onChange={handleReplyChange}
            placeholder="Напишите ответ..."
            className='reply-input__text'
          />
          <button onClick={handleReplySubmit} className='reply-input__button'>Отправить</button>
        </div>
      )}
      <div className="replies">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="reply">
            <p className='reply__message'><strong>{reply.author.username}</strong>: {reply.content}</p>
          </div>
        ))}
      </div>
    </CommentWrapper>
  );
};

export default Comment;

