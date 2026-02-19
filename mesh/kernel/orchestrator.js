import fs from "fs";
import path from "path";

const AGENTS_DIR = "./mesh/agents";

const loadAgents = () => {
  const files = fs.readdirSync(AGENTS_DIR).filter(f => f.endsWith(".js"));
  files.forEach(file => {
    const fullPath = path.join(AGENTS_DIR, file);
    import("file://" + fullPath);
    console.log(`🧠 Caricato agente: ${file}`);
  });
};

loadAgents();
