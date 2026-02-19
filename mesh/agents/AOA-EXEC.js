import { connect } from "nats.ws";
import { exec } from "child_process";

const run = async () => {
  const nc = await connect({ servers: "ws://localhost:4222" });
  const sub = nc.subscribe("aoa.cmd");

  for await (const msg of sub) {
    const cmd = msg.string();
    if (!cmd.startsWith("exec:")) continue;
    const shellCmd = cmd.replace("exec:", "").trim();

    exec(shellCmd, (err, stdout, stderr) => {
      const out = stdout || stderr || err?.message || "Nessuna risposta";
      nc.publish("aoa.status", new TextEncoder().encode(`[EXEC] ${shellCmd} → ${out.slice(0, 200)}`));
    });
  }
};

run();
