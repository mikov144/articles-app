// src/components/CommentSection/Comment.js
import React, { useState } from 'react';
import { useComments } from '../../context/CommentContext';
import { getCurrentUser } from '../../services/authService';
import { CommentWrapper } from './comment.styled';
import TrashBin from '../../icons/delete.png'
import EditBtn from '../../icons/edit.png'
import ReplyBtn from '../../icons/reply.png'

const Comment = ({ comment, articleId }) => {
  const { editComment, deleteComment, addReply } = useComments();
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const username = getCurrentUser();

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
      id: `reply-${Date.now()}`,
      created_at: new Date().toISOString(),
    };

    try {
      addReply(comment.id, replyData);
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
      setIsEditing(false);
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(articleId, comment.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const editingModeHandler = () => {
    setIsEditing(true);
    setShowReplyBox(false)
  }

  const replyModeHandler = () => {
    setShowReplyBox(true);
    setIsEditing(false);
  }

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
        <>
          <div className='comment-header'>
            <p className='comment-header__author'>{comment.author ? comment.author.username : 'Anonymous'}</p>
            <div className='comment__meta'>
              <span className='comment__date'>{comment.created ? new Date(comment.created).toLocaleDateString("ru-RU") : 'Дата:'}</span>
              <button onClick={replyModeHandler} className='comment__button'><img className='comment_button-icon' src={ReplyBtn} alt='' /></button>
              {comment.author && comment.author.username === username && (
                <>
                  <button onClick={editingModeHandler} className='comment__button'><img className='comment_button-icon' src={EditBtn} alt='' /></button>
                  <button onClick={handleDelete} className='comment__button'><img className='comment_button-icon' src={TrashBin} alt='' /></button>
                </>
              )}
            </div>
          </div>
          <p className='comment__message'>{comment.content}</p>
        </>
      )}
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
        {comment.replies && comment.replies.map((reply) => (
          <div key={reply.id} className="reply">
            <p className='reply__author'>{reply.author ? reply.author.username : 'Anonymous'}</p>
            <span className='reply__date'>{comment.created ? new Date(comment.created).toLocaleDateString("ru-RU") : 'Дата:'}</span>
            <p className='reply__message'>{reply.content}</p>
          </div>
        ))}
      </div>
    </CommentWrapper>
  );
};

export default Comment;
