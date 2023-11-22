import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from "../services/TicketsService.js"
import { logger } from "../utils/Logger.js"

// note

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/tickets', this.getTicketsByAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByAccount(req, res, next) {
    try {
      // logger.log('account id:', req.userInfo.accountId)
      const tickets = await ticketsService.getTicketsByAccount(req.userInfo.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

}
