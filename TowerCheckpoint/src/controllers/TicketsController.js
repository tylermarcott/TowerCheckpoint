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