import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import { BadRequest } from "../utils/Errors.js";
import { ticketsService } from "../services/TicketsService.js";


export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router

      .get('', this.getEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets', this.getEventTicketPurchasers)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async getEvents(req, res, next) {
    try {
      const event = await eventsService.getEvent(req.query)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getEventTicketPurchasers(req, res, next) {
    try {
      const purchasers = await ticketsService.getEventTicketPurchaser(req.params.eventId)
      res.send(purchasers)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      const eventBody = req.body
      eventBody.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(eventBody)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const updates = req.body
      const eventId = req.params.eventId
      const editedEvent = await eventsService.editEvent(updates, eventId)
      res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(req.params.eventId, req.userInfo.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}