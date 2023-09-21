

export class Event{
  constructor(data){
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = data.startDate
    this.isCanceled = data.isCanceled
    this.category = data.type
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.ticketCount = data.ticketCount
  }
}