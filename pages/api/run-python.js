import { exec } from "child_process";
import path from "path";

export default function handler(req, res) {
  const scriptPath = path.join(process.cwd(), "scripts", "text.py");

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ output: stdout });
  });
}
