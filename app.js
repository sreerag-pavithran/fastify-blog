"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // FASTIFY ENV
  fastify.register(require("fastify-env"), {
    confKey: "config",
    schema: {
      type: "object",
      required: ["PORT", "DB"],
      properties: {
        PORT: {
          type: "string",
          default: 3000,
        },
        DB: {
          type: "string",
        },
      },
    },
    dotenv: true,
  });

  // FASTIFY BCRYPT
  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 6,
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
