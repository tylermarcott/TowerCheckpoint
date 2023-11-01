import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./components/Account.js').Account} */
  account: {},
  /**@type {Event[]} */
  events: [],

  /**@type {Event} */
  activeEvent: null,

  /**@type {Comment[]} */
  activeComments : [],

  /**@type {Ticket[]} */
  activeEventTickets: [],

  /**@type {Ticket[]} */
  accountTickets: []
})
