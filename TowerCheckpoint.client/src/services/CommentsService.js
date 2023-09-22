import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



// TODO: have to test this once create comment is created. There are so few comments in the db and so many events, can't find the events with comments on them lol
class CommentsService{
  async getCommentsByEvent(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('got the following comments:', res.data)
    AppState.activeComments.map(comment => new Comment(comment))
  }

  async createComment(formData, userId){
    logger.log(`creating a comment for ${userId} with the ${formData}`)
  }
}

export const commentsService = new CommentsService()