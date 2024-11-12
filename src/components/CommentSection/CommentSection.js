// src/components/CommentSection/CommentSection.js
import React, { useEffect, useState } from 'react';
import { useComments } from '../../context/CommentContext';
import { getCurrentUser } from '../../services/authService';
import Comment from './Comment';
import { CommentSectionWrapper } from './commentSection.styled';

const CommentSection = ({ articleId }) => {
  const { comments, fetchComments, createComment } = useComments();
  const [newComment, setNewComment] = useState('');
  const username = getCurrentUser();

  useEffect(() => {
    fetchComments(articleId);
  }, [articleId, fetchComments]);

  const handleAddComment = async () => {
    if (!username) {
      console.error("User is not authenticated");
      return;
    }

    const commentData = {
      content: newComment,
      author: {
        username: username
      },
      created_at: new Date().toISOString(),
      replies: []
    };

    try {
      await createComment(articleId, commentData);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <CommentSectionWrapper>
      <h2 className='comment-section__title'>Комментарии:</h2>
      <div className="comment-section__input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Оставить комментарий..."
          className="comment-section__input-text"
        />
        <button onClick={handleAddComment} className="comment-section__input-button">Отправить</button>
      </div>
      <div className="comment-section__list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} articleId={articleId} />
        ))}
      </div>
    </CommentSectionWrapper>
  );
};

export default CommentSection;
