const fastify = require("fastify")()
const routers = require("./router/RouterIndex")

routers(fastify)

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
