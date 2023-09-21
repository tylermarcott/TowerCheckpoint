import { dbContext } from "../db/DbContext.js"


class TicketsService {
  async createTicket(ticketBody) {
    const ticket = await dbContext.Ticket.create(ticketBody)
    await ticket.populate('profile event')
    return ticket
  }


  async getTicketsByAccount(userId) {
    const ticket = await dbContext.Ticket.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'create ticketCount', select: '-email' } })
    return ticket
  }

}


export const ticketsService = new TicketsService()