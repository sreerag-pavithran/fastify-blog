"use strict";
const mongoose = require("mongoose");

module.exports = async (fastify, options) => {
  // Connecting to MongoDB
  await mongoose
    .connect(fastify.config.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Error Occured connecting MongoDB", err));

  fastify.get("/mongo", async function (request, reply) {
    return reply.code(200).send({
      status: 200,
      connection_status: {
        port: fastify.config.PORT,
        mongo: mongoose.STATES[mongoose.connection.readyState],
      },
    });
  });
};
