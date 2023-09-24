import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { Ticket } from "../models/Ticket.js"

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getTicketsByAccount(){
    const res = await api.get('account/tickets')
    AppState.accountTickets = res.data.map(ticket => new Ticket(ticket))
  }
  
}

export const accountService = new AccountService()
