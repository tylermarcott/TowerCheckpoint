import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"

logger

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
    logger.log('here is the tickets we got for the event:', res.data)
  }

}



export const eventsService = new EventsService()