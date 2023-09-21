import { dbContext } from "../db/DbContext.js"


class TicketsService {
  async createTicket(ticketBody) {
    const ticket = await dbContext.Ticket.create(ticketBody)
    await ticket.populate('profile event')
    return ticket
  }

  getTicket() {
    // const ticket = await dbContext.Ticket.
  }

}


export const ticketsService = new TicketsService()