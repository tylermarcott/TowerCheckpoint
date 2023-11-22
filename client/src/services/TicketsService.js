import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ticket } from "../models/Ticket.js"


class TicketsService{
  async createTicket(ticketData){
    const res = await api.post('api/tickets', ticketData)
    AppState.activeEventTickets.push(new Ticket(res.data))
  }

  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    const indexToRemove = AppState.activeEventTickets.findIndex(ticket => ticket.id == ticketId)

    AppState.activeEventTickets.splice(indexToRemove, 1)
  }

}

export const ticketsService = new TicketsService