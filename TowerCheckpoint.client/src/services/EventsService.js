import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Event } from "../models/Event.js"

logger

class EventsService{
  async getEvents(){
    const res = await api.get('api/events')
    logger.log('here is our data from api:', res.data)
    AppState.events = res.data.map(event => new Event(event))

    logger.log('here is our event data:', AppState.events)
  }
}


export const eventsService = new EventsService()