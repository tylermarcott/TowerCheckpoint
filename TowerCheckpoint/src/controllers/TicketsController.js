import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .get('', this.getTicket)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
  }

  async createTicket(req, res, next) {
    try {
      const ticketBody = req.body
      ticketBody.accountId = req.userInfo.id //NOTE: make sure to attach the account id to the request body, because we need to make sure that the automatically populated account id is appended to the body, not entered by the creator
      const ticket = await ticketsService.createTicket(ticketBody)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async getTicket(req, res, next) {
    try {
      const ticket = await ticketsService.getTicket()
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

}