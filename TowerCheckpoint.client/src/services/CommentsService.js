import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class CommentsService{
  async getCommentsByEvent(eventId){
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('got the following comments:', res.data)
    AppState.activeComments.map(comment => new Comment(comment))
  }
}

export const commentsService = new CommentsService()