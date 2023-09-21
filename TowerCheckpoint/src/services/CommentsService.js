import { dbContext } from "../db/DbContext.js"


class CommentsService {
  async createComment() {
    const comment = await dbContext.Comment
  }

}

export const commentsService = new CommentsService()