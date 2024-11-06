// src/components/CommentSection/Comment.js
import React, { useState } from 'react';
import { editComment, deleteComment } from '../../services/articleService';
import { getCurrentUser } from '../../services/authService';
import { CommentWrapper } from './comment.styled';

const Comment = ({ comment, onDelete }) => {
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const username = getCurrentUser();
  const articleId = comment.article; // Ensure the comment object includes the article ID

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async () => {
    if (!username) {
      console.error("User is not authenticated");
      return;
    }

    const replyData = {
      content: reply,
      author: {
        username: username
      },
      id: `reply-${Date.now()}` // Ensure unique key for reply
    };

    try {
      const updatedComment = { ...comment, replies: comment.replies || [] };
      updatedComment.replies.push(replyData);
      setReply('');
      setShowReplyBox(false);
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleEditSubmit = async () => {
    try {
      await editComment(articleId, comment.id, { content: editedContent });
      comment.content = editedContent;
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(articleId, comment.id);
      onDelete(comment.id); // Notify parent component to remove the comment from the UI
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <CommentWrapper>
      {isEditing ? (
        <div className='edit-section'>
          <textarea
            value={editedContent}
            onChange={handleEditChange}
            placeholder="Новый комментарий..."
            className='edit-input__text'
          />
          <button onClick={handleEditSubmit} className='edit__button'>Сохранить</button>
        </div>
      ) : (
        <p className='comment__message'><strong>{comment.author ? comment.author.username : 'Anonymous'}</strong>: {comment.content}</p>
      )}
      <button onClick={() => setShowReplyBox(!showReplyBox)} className='comment__button'>Ответить</button>
      {comment.author && comment.author.username === username && (
        <div>
          <button onClick={() => setIsEditing(!isEditing)} className='comment__button'>Изменить</button>
          <button onClick={handleDelete} className='comment__button'>Удалить</button>
        </div>
      )}
      {showReplyBox && (
        <div className="reply-input">
          <textarea
            value={reply}
            onChange={handleReplyChange}
            placeholder="Write a reply..."
            className='reply-input__text'
          />
          <button onClick={handleReplySubmit} className='reply-input__button'>Отправить</button>
        </div>
      )}
      <div className="replies">
        {comment.replies && comment.replies.map((reply) => (
          <div key={reply.id} className="reply"> {/* Ensure unique key */}
            <p className='reply__message'><strong>{reply.author ? reply.author.username : 'Anonymous'}</strong>: {reply.content}</p>
          </div>
        ))}
      </div>
    </CommentWrapper>
  );
};

export default Comment;
