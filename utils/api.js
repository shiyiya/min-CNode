import { _fetch } from './wx-utils'

export const HOST = 'https://cnodejs.org/api/v1'
const TOPICS = '/topics'
const COLLECT_TOPIC = '/topic_collect/collect'
const DE_COLLECT_TOPIC = '/topic_collect/de_collect'
const VALID_ACCESSTOKEN = '/accesstoken'

// dynamic api
const TOPIC = id => `/topic/${id}?mdrender=false`
const USER_INFO = name => `/user/${name}`
const UP_REPLAY = id => `/reply/${id}/ups`
const USER_COLLECT_TOPIC = name => `/topic_collect/${name}`

function fetchTopics(params) {
  return _fetch.get(TOPICS, params)
}

function fetchTopic(id) {
  return _fetch.get(TOPIC(id))
}

function collectTopic(id, token) {
  return _fetch.post(COLLECT_TOPIC, { topic_id: id, accesstoken: token })
}

function deCollectTopic(id) {
  return _fetch.post(DE_COLLECT_TOPIC, {
    topic_id: id,
    accesstoken: getApp().globalData.userInfo.accesstoken
  })
}

function fetchUserCollectTopic(name) {
  return _fetch.get(USER_COLLECT_TOPIC(name))
}

function fetchUserInfo(name) {
  return _fetch.get(USER_INFO(name))
}

function validToken(accesstoken) {
  return _fetch.post(VALID_ACCESSTOKEN, { accesstoken })
}

function upReply() {}

export {
  _fetch,
  fetchTopics,
  fetchTopic,
  collectTopic,
  deCollectTopic,
  fetchUserCollectTopic,
  fetchUserInfo,
  validToken
}
