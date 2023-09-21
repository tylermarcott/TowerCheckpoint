import { dbContext } from "../db/DbContext.js"
import { eventsService } from "./EventsService.js"


class CommentsService {
  async getCommentsByEvent(eventId) {
    await eventsService.getEventById(eventId)
    const comment = await dbContext.Comment.find({ eventId: eventId }).populate('creator')
    return comment
  }
  async createComment(commentBody) {
    const comment = await dbContext.Comment.create(commentBody)
    await comment.populate('creator')
    return comment
  }

  async deleteComment(commentId) {
    const comment = await dbContext.Comment.findById(commentId)
    await comment.remove()

    return 'Comment deleted.'
  }

}

export const commentsService = new CommentsService()