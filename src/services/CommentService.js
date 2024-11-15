// CommentService.js
import axios from 'axios';
import TokenService from './TokenService';

const API_URL = 'http://localhost:8080/api/comments';

const CommentService = {
    // Thêm một bình luận mới
    addComment(commentData) {
        TokenService.setTokenInHeader();
        return axios.post(`${API_URL}`, commentData); 
    },
    

    // Lấy các bình luận theo Meal ID
    getComments(mealId) {
        TokenService.setTokenInHeader();
        return axios.get(`${API_URL}/meal/${mealId}`);
    },

    // Xóa bình luận theo ID
    deleteComment(commentId) {
        TokenService.setTokenInHeader();
        return axios.delete(`${API_URL}/${commentId}`);
    }
};

export default CommentService;
