import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "../models/Ticket.js"


class TicketsService{
  async createTicket(ticketData){
    const res = await api.post('api/tickets', ticketData)
    AppState.activeEventTickets.push(new Ticket(res.data))
  }
}

export const ticketsService = new TicketsService