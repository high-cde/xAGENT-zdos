import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { connect } from "nats.ws";

const AGENTS_DIR = "./mesh/agents";

const run = async () => {
  const nc = await connect({ servers: "ws://localhost:4222" });
  const sub = nc.subscribe("aoa.cmd");

  for await (const msg of sub) {
    const cmd = msg.string();
    if (!cmd.startsWith("replica")) continue;

    const name = "REPLICA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `
import { connect } from "nats.ws";
const run = async () => {
  const nc = await connect({ servers: "ws://localhost:4222" });
  setInterval(() => {
    nc.publish("aoa.status", new TextEncoder().encode("${name}: attivo"));
  }, 15000);
};
run();`;

    const filePath = path.join(AGENTS_DIR, `${name}.js`);
    fs.writeFileSync(filePath, code);
    spawn("node", [filePath], { detached: true, stdio: "ignore" });

    nc.publish("aoa.status", new TextEncoder().encode(`[REPLICATOR] Generato agente ${name}`));
  }
};

run();
