---
title: "Automating Neural DSP Tone Generation with LLMs"
date: "2026-04-18"
tags: [ neural-dsp, ai, automation, cli, workflow ]
draft: true
---

### 1. The Tone-Chasing Rabbit Hole
Every guitar player knows the ritual. You hear a sound—maybe the glass-shattering clean of an acoustic part or the crushing, mid-heavy distortion of a Tool track—and you want it. The manual path is soul-crushing: spend hours scrolling through Reddit threads, parse conflicting advice, try to manually map described settings to a plugin, and fail. 

I decided to stop searching and start automating. My goal? Build a system where I can describe a tone in plain English and have the machine do the heavy lifting.

### 2. Peeking Under the Hood
Neural DSP presets have a `.xml` extension, but they aren't plain text. A quick hex-dump revealed the truth: they are custom binary files prefixed with a `henson-x` header. 

After some reverse-engineering, I discovered a Tag-Length-Value (TLV) structure. Each parameter—from `leadGain` to the specific microphone type on the cabinet—is encoded in a sequence: a byte-tag, a length byte, and the value string. Once this binary structure was understood, I realized I didn't need to manually map anything ever again.

### 3. Redesigning for Automation: The Workflow
The naive approach would be to have the AI write binary code directly. That’s a recipe for corrupted files and headaches. Instead, I opted for a cleaner architecture:

*   **The AI (Reasoning):** I treat the LLM as the "Tone Architect." It understands the intent (e.g., "I want a *Lateralus* clean tone"). It selects the best base preset (a template) and decides exactly which parameters to adjust.
*   **The Script (Execution):** A purpose-built Python script acts as the "Binary Encoder." It accepts JSON overrides from `stdin`, merges them with a template, and safely writes the valid binary file.

This decoupling makes the system robust: the AI handles the semantics, and the script guarantees valid IO.

### 4. Real-World Application: The "Lateralus" Test
To test the system, I tasked it with recreating the iconic tones from Tool's *Lateralus*.

1.  **The Prompt:** "Create a preset for Lateralus, heavy distortion for the riff, clean for the verses."
2.  **The Process:** The AI matched my request against my existing library, picked two solid templates, and applied precise overrides for gain, compression, and reverb.
3.  **The Result:** I piped the following JSON to my generator script:

```json
{
  "leadGain": 0.72,
  "reverbMix": 0.41,
  "delayTime": 530,
  "reverbActive": true
}
```

The script generated the binary XML instantly. The resulting tone was scarily close to the source material, with the added benefit of being perfectly balanced for my specific setup.

### 5. Why do this?
Beyond the pure technical challenge, there’s something genuinely cool about using an LLM to generate a physical sound artifact. It shifts the guitar plugin experience from "manual labor" to "creative intent."

### 6. What's Next?
I’m currently exploring a "style memory" layer. By analyzing the presets the AI generates for me, I want it to learn my specific aesthetic preferences—biasing future matches toward the tones I consistently approve. 

Tone-chasing is dead. Long live tone-architecture.
