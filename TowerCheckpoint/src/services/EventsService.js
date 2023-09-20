import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class EventsService {
  async getEvent(query) {
    const event = await dbContext.Event.find(query).populate('ticketCount creator')
    return event
  }

  async getEventById(eventId) {
    const event = await dbContext.Event.findById(eventId).populate('ticketCount creator')
    if (!event) {
      throw new BadRequest(`No event exists for find.`)
    }
    return event
  }

  async createEvent(eventBody) {
    const event = await dbContext.Event.create(eventBody)
    await event.populate('ticketCount creator')
    return event
  }

  async editEvent(updates, eventId) {
    const originalEvent = await dbContext.Event.findById(eventId)

    if (!originalEvent) {
      throw new BadRequest('No event exists for edit.')
    }

    if (originalEvent.isCanceled) {
      throw new BadRequest('This event is already cancelled and cannot be further edited.')
    }

    originalEvent.name = updates.name || originalEvent.name
    originalEvent.description = updates.description || originalEvent.description
    originalEvent.coverImg = updates.coverImg || originalEvent.coverImg
    originalEvent.location = updates.location || originalEvent.location
    originalEvent.capacity = updates.capacity || originalEvent.capacity
    originalEvent.startDate = updates.startDate || originalEvent.startDate
    originalEvent.type = updates.type || originalEvent.type

    await originalEvent.save()
    return originalEvent
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getEventById(eventId)

    if (event.creatorId != userId) {
      throw new Forbidden("This is not your event to delete. BAD CAT")
    }

    if (event.isCanceled) {
      throw new BadRequest('This event is already cancelled and cannot be further edited.')
    }

    event.isCanceled = !event.isCanceled
    await event.save()
    return event
  }
}


export const eventsService = new EventsService()