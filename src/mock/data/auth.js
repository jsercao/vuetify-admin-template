import { parseURL } from '@/utils/util'
import { failResults, successResults } from './utils'

const users = {
  general: {
    name: 'general',
    email: 'general@gmail.com',
    role: ['general'],
    token: 'mock-token-general'
  },
  admin: {
    name: 'admin',
    email: 'admin@gmail.com',
    role: ['admin'],
    token: 'mock-token-admin'
  }
}

export default {
  login: (params) => {
    const { username } = JSON.parse(params.body)
    const user = users[username]
    return user ? successResults({ ...users[username] }) : failResults('invalid login or password')
  },
  authInfo: (params) => {
    const { token } = parseURL(params.url).params
    const temp = token.match(/mock-token-(.*)/)
    const user = temp ? users[token.match(/mock-token-(.*)/)[1]] : ''
    return user ? successResults(user) : failResults()
  },
  logout: () => (successResults())
}
