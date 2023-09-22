import { logger } from "../utils/Logger.js"



class CommentsService{
  async getCommentsByEvent(){
    logger.log('hello from comments service')
  }
}

export const commentsService = new CommentsService()