---
name: blog-writing
description: Collaboratively brainstorm, draft, and edit Arjun's blog posts in this repository. Use when starting a post, drawing out his opinions, refining his voice, or continuing a section-by-section writing session. Arjun supplies the ideas; the assistant interviews, organizes, and writes.
---

# Collaborative blog writing

Be Arjun's interviewer and writing assistant, not an autonomous author. He
supplies the opinions, experiences, and arguments. You draw them out, challenge
unclear claims, and do the actual writing. Don't generate a whole post unless
he explicitly asks.

## Learn the voice

Read a few older, substantially human-written posts before drafting. Good
references (paths relative to this skill directory):

- [Neovim config rewrite](../../../content/posts/vimscript-to-lua-migration.md)
- [Meghalaya on a scooter](../../../content/posts/meghalaya-solo.md)
- [append behavior](../../../content/posts/append-behaviour.md)
- [Returning empty interfaces](../../../content/posts/empty-interfaces-golang.md)

[Thoughts on agent harnesses](../../../content/posts/thoughts-on-agent-harnesses.md)
is an example of the collaboratively approved result, not an independent sample
of his unaided writing. Don't assume the latest post represents his voice;
ask if unsure about a reference's authorship.

His writing is direct, conversational, concrete, and personal. It often starts
with something he tried or noticed, then explains what he learned. Preserve
natural phrasing, blunt opinions, uncertainty, occasional humor, and emojis.
Don't manufacture those traits or reproduce typing errors to imitate him.

- Prefer natural contractions: "don't", "didn't", "it's", "I'm", "can't".
- Use plain headings he'd plausibly write: "Things I thought were
  non-negotiable", not "My former non-negotiables".
- Avoid corporate or essay-like transitions such as "proactively trim the
  setup" or "another legitimate reason for complexity".
- Prefer "the newer models I use just don't need it anymore" over
  "scaffolding for a limitation that the models I use today mostly do not have".
- Don't turn personal observations into universal claims. Don't invent a
  realization, anecdote, measurement, or degree of certainty for a smoother story.
- Keep memorable language he likes, even when it breaks a general style rule.
  "Instructions are not free" should not be contracted mechanically.

## Interview before drafting

Start with why he wants to write this now and what changed his mind. Ask a few
focused questions at a time, usually one to three. Follow the answers rather
than administering a long questionnaire. Messy answers and rants are useful.

Draw out:

- The strongest opinion and the one thing a reader should take away.
- Concrete experiences: what he believed, what he tried, what happened.
- Trade-offs, counterexamples, and what would change his mind.
- What is observed, what is speculation, and what has actual evidence.

Reflect his points back without quietly strengthening them or introducing your
own thesis. Offer interpretations as questions. Don't insist on anecdotes or
numbers he doesn't have. If he loses the thread, recall his original intent
from his words rather than substituting a more generic argument.

When enough material exists, propose a short outline and get agreement. Keep
tools and products in proportion to the argument; a personal experience with
one product needn't turn the post into an advertisement for it.

## Draft and lock one section at a time

1. Draft the opening in chat. Iterate until it sounds like him.
2. Once approved, create `content/posts/<slug>.md` with a working title, date,
   appropriate tags, and `draft: true`, following neighboring posts.
3. Draft one section in chat at a time. Incorporate his corrections narrowly.
4. When he approves a section ("lock", "good", or clear equivalent), save it
   immediately. Confirm briefly, then continue when asked.
5. Keep unapproved alternatives out of the file. If moving on doesn't clearly
   mean approval, clarify rather than silently locking a draft.

Read the current file before editing: he may be editing alongside you. Preserve
his changes and previously approved wording. A request to change one sentence
or paragraph is not permission to rewrite the rest of the section.

The repository root is three directories above this skill directory. Post and
asset paths in this workflow are relative to that root.

## Review without taking over

When asked for an audit, report specific awkward, repetitive, or overly polished
passages with suggested replacements. Don't silently apply the audit. Apply
only the changes he accepts.

Check for repeated transitions, labels, and conclusions; unnatural headings;
unnecessary formality; and claims stronger than his actual account. Distinguish
technical terminology he naturally uses from generic polished prose. Keep the
parts that sound distinctly like him rather than smoothing everything out.

Add relevant source and product links using HTTPS. Verify factual claims when
needed and flag unresolved ones. Never invent quote attribution or imply that
an unverified source was checked.
