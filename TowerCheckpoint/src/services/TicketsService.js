import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TicketsService {
  async createTicket(ticketBody) {
    const ticket = await dbContext.Ticket.create(ticketBody)
    await ticket.populate('event')
    await ticket.populate('profile', '-email')
    return ticket
  }

  async getTicketsByAccount(userId) {
    const ticket = await dbContext.Ticket.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator ticketCount', select: '-email' } })
    return ticket
  }

  async getEventTicketPurchaser(eventId) {
    const purchaser = await dbContext.Ticket.find({ eventId }).populate('profile', '-email')
    return purchaser
  }

  async removeTicket(ticketId, userId) {
    const ticket = await dbContext.Ticket.findById(ticketId).populate('event profile')
    if (!ticket) {
      throw new BadRequest(`Ticket not found with the following id: ${ticketId}`)
    }
    if (userId != ticket.accountId) {
      throw new Forbidden('This is not your ticket to delete!')
    }

    await ticket.remove()

    return 'Event ticket successfully removed.'
  }

}


export const ticketsService = new TicketsService()