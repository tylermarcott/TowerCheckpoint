import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"
import { Ticket } from "../models/Ticket.js"
import { Comment } from "../models/Comment.js"

class EventsService{
  async getEvents(){
    const res = await api.get('api/events')
    AppState.events = res.data.map(event => new Event(event))

    logger.log('here is our event data:', res.data)
  }

  async getEventById(eventId){
    const res = await api.get(`api/events/${eventId}`)
    AppState.activeEvent = new Event(res.data)
  }


  async createEvent(formData){
    const res = await api.post('api/events', formData)
    const newEvent = new Event(res.data)
    AppState.events.unshift(newEvent)
    return newEvent
  }

  async cancelEvent(eventId){
    const res = await api.delete(`api/events/${eventId}`)

    AppState.activeEvent = new Event(res.data)
  }

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.activeEventTickets = res.data.map(ticket => new Ticket(ticket))
  }


  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.activeComments = res.data.map(c => new Comment(c)) //NOTE: make sure to import your classes or you will get issues.
  }
}



export const eventsService = new EventsService()