import { connect } from "nats.ws";

const name = "AOA-RELAY";

const run = async () => {
  const nc = await connect({ servers: "ws://localhost:4222" });

  const sub = nc.subscribe("aoa.cmd");
  for await (const msg of sub) {
    const cmd = msg.string();
    if (cmd === "status") nc.publish("aoa.status", new TextEncoder().encode(`${name}: attivo`));
    if (cmd === "ping") nc.publish("aoa.status", new TextEncoder().encode(`${name}: pong`));
  }

  setInterval(() => {
    nc.publish("aoa.status", new TextEncoder().encode(`${name}: heartbeat`));
  }, 10000);
};

run();
