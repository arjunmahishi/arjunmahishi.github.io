#!/usr/bin/env node
const matter = require("gray-matter");
const fs = require("fs");
const path = require("path");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/generate-audio.mjs <post-slug>");
  process.exit(1);
}

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  console.error("ELEVENLABS_API_KEY not set");
  process.exit(1);
}

const mdPath = path.join(process.cwd(), "content", "posts", `${slug}.md`);
if (!fs.existsSync(mdPath)) {
  console.error(`Post not found: ${mdPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(mdPath, "utf8");
const { content } = matter(raw);

let text = content
  .replace(/```[\s\S]*?```/g, "")
  .replace(/`[^`]+`/g, "")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
  .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
  .replace(/^#{1,6}\s+/gm, "")
  .replace(/\*\*([^*]+)\*\*/g, "$1")
  .replace(/\*([^*]+)\*/g, "$1")
  .replace(/^\s*[-*+]\s+/gm, "")
  .replace(/^\s*\d+\.\s+/gm, "")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

console.log(`Text length: ${text.length} chars`);

async function main() {
  console.log("Generating audio with ElevenLabs...");
  const resp = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/iP95p4xoKVk53GoZ742B`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!resp.ok) {
    const err = await resp.text();
    console.error(`ElevenLabs error (${resp.status}): ${err}`);
    process.exit(1);
  }

  const buffer = Buffer.from(await resp.arrayBuffer());
  const tmpPath = `/tmp/${slug}.mp3`;
  fs.writeFileSync(tmpPath, buffer);
  console.log(`Audio saved: ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);

  console.log("Uploading to R2...");
  const { execSync } = require("child_process");
  execSync(
    `wrangler r2 object put blog-audio/${slug}.mp3 --file ${tmpPath} --content-type audio/mpeg --remote`,
    { stdio: "inherit" }
  );

  console.log("\nDone! Add this to your post frontmatter:");
  console.log(
    `audio: https://pub-9106c7dd622a4625b893684883c7dc2d.r2.dev/${slug}.mp3`
  );

  fs.unlinkSync(tmpPath);
}

main();