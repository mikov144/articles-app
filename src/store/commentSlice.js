// // src/store/commentSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchCommentsByArticleId, createComment as apiCreateComment, editComment as apiEditComment, deleteComment as apiDeleteComment } from '../services/articleService';

// const initialState = {
//   comments: [],
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null
// };

// export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId) => {
//   const response = await fetchCommentsByArticleId(articleId);
//   return response.data;
// });

// export const createComment = createAsyncThunk('comments/createComment', async ({ articleId, commentData }) => {
//   const response = await apiCreateComment(articleId, commentData);
//   return response.data;
// });

// export const editComment = createAsyncThunk('comments/editComment', async ({ articleId, commentId, commentData }) => {
//   await apiEditComment(articleId, commentId, commentData);
//   return { commentId, commentData };
// });

// export const deleteComment = createAsyncThunk('comments/deleteComment', async ({ articleId, commentId }) => {
//   await apiDeleteComment(articleId, commentId);
//   return commentId;
// });

// const commentsSlice = createSlice({
//   name: 'comments',
//   initialState,
//   reducers: {
//     addReply(state, action) {
//       const { commentId, reply } = action.payload;
//       const existingComment = state.comments.find(comment => comment.id === commentId);
//       if (existingComment) {
//         existingComment.replies.push(reply);
//       }
//     }
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchComments.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.comments = action.payload.map(comment => ({
//           ...comment,
//           replies: comment.replies || []
//         }));
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(createComment.fulfilled, (state, action) => {
//         state.comments.push({ ...action.payload, replies: [] });
//       })
//       .addCase(editComment.fulfilled, (state, action) => {
//         const { commentId, commentData } = action.payload;
//         const existingComment = state.comments.find(comment => comment.id === commentId);
//         if (existingComment) {
//           existingComment.content = commentData.content;
//         }
//       })
//       .addCase(deleteComment.fulfilled, (state, action) => {
//         const commentId = action.payload;
//         state.comments = state.comments.filter(comment => comment.id !== commentId);
//       });
//   }
// });

// export const { addReply } = commentsSlice.actions;

// export default commentsSlice.reducer;
