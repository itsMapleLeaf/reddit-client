import fastifySession from "fastify-session"
import Redis from "ioredis"

const redis = new Redis()

export function createRedisSessionStore(): fastifySession.SessionStore {
	return {
		get(id, callback) {
			redis.get(id, (err, res) => {
				callback(err || undefined, res && JSON.parse(res))
			})
		},

		set(id, session, callback) {
			redis.set(id, JSON.stringify(session), (err) => {
				callback(err || undefined)
			})
		},

		destroy(id, callback) {
			redis.del(id, (err) => callback(err || undefined))
		},
	}
}
