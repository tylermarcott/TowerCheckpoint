import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";



export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }
  async createComment(req, res, next) {
    try {
      const body = req.body
      body.creatorId = req.userInfo.id //NOTE: forgot this again. HAVE to add creatorID from user info first.
      const comment = await commentsService.createComment(body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}