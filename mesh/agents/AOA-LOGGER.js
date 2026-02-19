import { connect } from "nats.ws";
import fs from "fs";

const run = async () => {
  const nc = await connect({ servers: "ws://localhost:4222" });
  const sub = nc.subscribe("aoa.status");

  for await (const msg of sub) {
    const line = `[${new Date().toISOString()}] ${msg.string()}\n`;
    fs.appendFileSync("./mesh/logs/aoa.log", line);
  }
};

run();
