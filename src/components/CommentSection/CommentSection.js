// src/components/CommentSection.js
import React, { useEffect, useState } from 'react';
import { fetchCommentsByArticleId } from '../../services/articleService';
import { getCurrentUser } from '../../services/authService';
import Comment from './Comment';
import { CommentSectionWrapper } from './commentSection.styled';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const username = getCurrentUser()

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await fetchCommentsByArticleId(articleId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    getComments();
  }, [articleId]);

  const handleAddComment = () => {
    const comment = {
      id: comments.length + 1,
      content: newComment,
      author: {
        username: username
      },
      replies: []
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <CommentSectionWrapper>
      <h2 className='comment-section__title'>Комментарии</h2>
      <div className="comment-section__input">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Оставить комментарий..."
          className="comment-section__input-text"
        />
        <button onClick={handleAddComment} className="comment-section__input-button">Отправить</button>
      </div>
      <div className="comment-section__list">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </CommentSectionWrapper>
  );
};

export default CommentSection;
