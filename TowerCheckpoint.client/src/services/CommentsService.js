import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Comment } from "../models/Comment.js"
// NOTE: did not put in comment import again lol


// TODO: have to test this once create comment is created. There are so few comments in the db and so many events, can't find the events with comments on them lol
class CommentsService{

  async createComment(data){
    const res = await api.post('api/comments', data)
    AppState.activeComments.push(new Comment(res.data))
  }

  async deleteComment(commentId){
    const res = await api.delete(`api/comments/${commentId}`)
    const indexToRemove = AppState.activeComments.findIndex(comment => comment.id == commentId)
    AppState.activeComments.splice(indexToRemove, 1)
  }
}

export const commentsService = new CommentsService()