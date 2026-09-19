---
title: "It's not the model, it's the harness"
date: "2026-09-19"
tags: [ai, agents]
toc: true
image: /img/its-not-the-model-its-the-harness/hero.png
audio: https://pub-9106c7dd622a4625b893684883c7dc2d.r2.dev/its-not-the-model-its-the-harness.mp3
---

I've been using coding agents heavily for a while now. I've also had the
opportunity to build a couple of agent harnesses from scratch, including one
that's running in production. Recently, I had a few epiphanies that completely
changed how I think about agents, especially the harness around the model.
Things like plan mode and subagents, which used to be non-negotiable for me,
now feel mostly unnecessary. This post is an attempt to put those thoughts into
words.

But first, some basics.

## What is a harness?

To me, a harness is the machinery that sits between the user and the LLM. The
LLM itself only generates text. Some of that text might be interpreted as tool
calls, but the actual "doing" is handled by the harness.

At its core, a harness is just a loop that keeps calling the LLM API until the
current turn is complete. A single turn can involve multiple trips to the
model, tool calls, and tool results.

I recently came across a great way to describe this:

> The harness is what makes an LLM an agent.

[Claude Code](https://claude.com/product/claude-code),
[Codex](https://github.com/openai/codex), [OpenCode](https://opencode.ai/),
[Pi](https://pi.dev/), etc.
are all harnesses. They provide the model with tools, execute those tools,
manage context, handle permissions, and decide
how the whole interaction works.

![The harness connects the user to the LLM, executes tool calls, and returns results to the model.](/img/its-not-the-model-its-the-harness/harness-loop.png)

## Where does the model end?

People keep saying that one model is great and another model sucks. They even
get emotionally attached to how a model behaves. But a lot of what they're
reacting to is actually the harness.

The system prompt, tools, context management, permissions, plan mode,
subagents, and other UX features are all controlled by the harness. All of
these can make the same model feel smarter or dumber. The model is only as good
as the harness allows it to be. Sometimes, the harness actively gets in the
way.

Claude Code does a particularly good job of confusing people about where the
model ends and the harness begins. It's closed source, tied to Anthropic
models, and updated alongside those models. So, everything feels like a Claude
feature. It's hard to tell whether you like Claude the model or Claude Code
the harness.

The way I think about it is: the model is the brain and the harness is the
hands. Or, to use a slightly more personal analogy, I'm the musician, the
model gives me the theoretical ability, and the harness gives me the finger
dexterity. Knowing all the music theory in the world isn't useful if your
fingers can't play the instrument. The opposite is also true.

## More tools are not always better

I recently watched Mario Zechner and Armin Ronacher on the [Pragmatic Engineer
podcast](https://www.youtube.com/watch?v=n5f51gtuGHE). Their discussion about
using Pi with only its basic default tools really caught my attention.

Until then, I was under the impression that a harness was only as good as the
tools available to it. More tools meant that the agent could do more things.
So, when I tried Pi, I started with no extensions, no custom tools, and almost
no instructions. I expected it to feel limiting.

Instead, it mostly used Bash for everything. Bash gave the model the freedom to
come up with its own way of doing things instead of picking from a large
collection of narrow tools. For programming, debugging, and even investigating
production incidents, you can do almost anything programmatically through
Bash.

There's obviously a security trade-off here. Giving an unpredictable model
access to Bash is scary. But I'm increasingly convinced that the guardrails
should exist at the infrastructure level through sandboxing, network policies,
IAM, etc. The tool itself can remain simple and powerful.

My bare-bones Pi setup with GPT Sol ended up working better than my much more
elaborate OpenCode setup with the same model. It was also cheaper. That was
when it clicked: my setup was still trying to solve problems that the model no
longer had.

## Instructions are not free

My OpenCode setup didn't become bloated overnight. Every time a model did
something I didn't like, I added another instruction.

“Name functions based on what they do.”

“Keep names simple.”

“Always check for reusable code.”

“Follow the patterns already established in the code.”

These were useful instructions for older models. But I treated my `AGENTS.md`
like an append-only file. I kept adding rules without reconsidering them as the
models got better. Newer models like Sol and Astra already do most of these
things without being told.

My old OpenCode `AGENTS.md` was 861 words. The one I currently use with Pi is
265 words. The old one prescribed everything from how the agent should explore
code to which tools it should use. It even had instructions for adding
co-author tags to commits, partly so I could track when I used an agent and
partly to show off that I was using one 😛. I no longer care about either.

Instructions are not free. They remain in the context through every trip to
the model. Some of them may never be relevant to the session. At best, they add
unnecessary cost. At worst, an instruction that doesn't apply to the current
task can completely derail the session.

Models change quickly. The instructions around them should not be append-only.
Now, I regularly go through the file and remove things I don't need anymore.

## Things I thought were non-negotiable

There were two features I considered non-negotiable in an agent harness:
subagents and plan mode. I cared about them enough that I rebuilt both in my Pi
setup. Neither worked out particularly well. Now, I use neither.

### Subagents

My old `AGENTS.md` had this instruction:

> Every tool call the main agent makes reduces the quality of the entire session.

The idea was to protect the main context from all the noise produced while
exploring a codebase. A subagent could do the exploration and return only the
answer. This does save context and money for that particular turn.

But using a subagent is also a way of preemptively compacting that entire
subtask. The main agent only gets the final answer. All the surrounding context
disappears.

That context can become useful later. When the next question overlaps with the
previous exploration, the agent has to discover the same things again. If the
main agent had done the exploration, that work could have been amortized across
the rest of the session. It would also have a better understanding of the
bigger picture.

![With subagents, files B and C are read again during a follow-up. Without subagents, their contents remain in the main agent's context and only file D needs to be read.](/img/its-not-the-model-its-the-harness/subagent-context.png)

I don't have numbers to prove that this is cheaper overall. But I can clearly
see the difference in latency, and in some cases, the quality of the result. I
no longer use subagents for coding tasks. Instead, I try to keep each session
lean and give it one well-scoped goal.

### Plan mode

I used to consider plan mode essential because models were too eager to start
implementing. Plan mode solved this by taking away all non-read-only tools. I
even built this capability into my Pi configuration.

Now, I just say:

> Don't make any changes yet.

Sol and Astra follow that instruction perfectly well. A separate mode with a
different set of tools feels unnecessary.

Claude models still tend to jump towards implementation. Even inside Claude
Code’s plan mode, Claude would constantly look for reasons to call the
`exit_plan_mode` tool and ask me to start implementing. My completely unproven
theory is that exposing the tool itself makes the model want to use it 😛.

Plan mode can still be useful with cheaper or less capable models. But it's no
longer a feature I consider essential to the harness. The newer models I use
just don’t need it anymore.

## Taking the training wheels off

I think of this like teaching a kid to ride a bicycle. The training wheels help
at first. But as the kid gets better, you take them off. You don't keep adding
more wheels 😛.

A lot of harness features were useful for getting weaker models to do things
reliably. As models get better, we should reconsider those features. Instead,
if Claude Code adds something, people ask why Codex and OpenCode don't have it.
The features keep accumulating.

Some of that complexity is necessary for security. Models are still
non-deterministic. A generic harness used by thousands of people can't assume
that everyone knows how to safely give a model access to their machine.

I don't think every harness needs to be as minimal as Pi. In the same way, I
don't think everyone should use Neovim. Most people want good defaults and a
complete experience without having to build it themselves. But opinionated
power users want to understand and control every part of their setup. For that
kind of user, Pi is to agent harnesses what Neovim is to editors.

The baseline is minimal in Pi, but almost everything is pluggable and moddable.
The user gets to decide how the UX works. More importantly, the setup can change
with the models. You shouldn't have to keep working around problems that newer
models have already solved.

## Avoiding vendor lock-in

Claude Code and Codex tie the harness to their own models. With something like
OpenCode or Pi, the harness and the model are separate choices.

The usual argument for a first-party harness is that it's specifically tuned
for the model. But is that a strength of the harness or a weakness of the
model? We're discussing AGI and the end of humanity, but apparently the model
needs a carefully tuned harness before it can use a shell properly 😛.

Maybe this tuning made a meaningful difference for older models. I think it's
slightly overstated now. Newer frontier models are very good at understanding
tool definitions, following instructions, and adapting to the environment they
are given. The hands should just do what the brain tells them to do.

Keeping the model replaceable also protects you from vendor lock-in. You never
know when prices will go up, a model will get worse, or another provider will
pull ahead. Open-weight and Chinese models are catching up quickly at much
lower prices. I want to keep those doors open without changing my entire
workflow every time I change the model.

I can also run GPT, Claude, Gemini, and Qwen through the same setup and compare
them. For an opinionated power user, choosing a
harness independently of the model feels like a no-brainer.

## If you take away one thing

I don't want this post to be an advertisement for Pi. Pi just happened to be
the thing that made me reconsider a lot of assumptions I had about agents.

If there's one thing you take away from this post, it should be to think about
the model and the harness separately. Before deciding that a model is good or
bad, consider how much of that experience is coming from the harness. And
whenever you switch to a smarter model, reconsider whether all the instructions
and features in your setup are still required.

My current evaluation process isn't very scientific:

- How smooth is it to make the changes I want?
- How often do I cuss at my setup?
- Is it adding unnecessary latency or cost?
- Do I understand why each instruction, tool, and feature is there?

As models get smarter, I expect good harnesses to need less machinery around
them. I joked on Twitter that the ideal harness will eventually become:

```bash
while true; do curl ... | bash; done
```

We're obviously not there yet. But we might be closer than all the plan modes,
subagents, instructions, and specialized tools make it seem.
