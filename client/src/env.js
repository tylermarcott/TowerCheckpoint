export const dev = window.location.origin.includes('localhost')

// NOTE: change the http://localhost to http://tylermarcott.dev/tower
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-r2l4kl7ifqatct23.us.auth0.com'
export const clientId = '3ugFmbTisZI8MvM7ux0qRbSLZS8X8Zo1'
export const audience = 'https://tylerApi.com'
