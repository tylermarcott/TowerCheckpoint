import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { accountService } from "../services/AccountService.js";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.removeTicket)
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

  async removeTicket(req, res, next) {
    try {
      const message = await ticketsService.removeTicket(req.params.ticketId, req.userInfo.id)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }

}