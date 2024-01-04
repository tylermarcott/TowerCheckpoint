import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
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

  async deleteComment(commentId, userId) {


    const comment = await dbContext.Comment.findById(commentId)

    if (userId != comment.creatorId) {
      throw new Forbidden('This is not your comment to delete.')
    }

    await comment.remove()

    return 'Comment deleted.'
  }

  // comment to commit build

}

export const commentsService = new CommentsService()