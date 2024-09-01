---
title: "Debugging like a savage with Delve CLI"
date: "2024-09-01"
tags: [cli, debugging, golang]
image: "https://i.imgur.com/CUkXvDf.png"
toc: true
draft: true
---

I have a constant ongoing inner battle staying away from IDEs. For many
reasons, I prefer using a terminal based text editor and the command line for
most of my development tasks. But when it comes to debugging, I always find
myself reaching for Goland. I couldn't for the life of me figure out debugging
with nvim and delve. I tried a couple of times but always ended up frustrated
and went back to Goland.

But not anymore. I finally starting to get comfortable with debugging using the
delve CLI. This post is a runbook of workflows I use to debug Go programs using
the delve CLI. This will be an ever growing list of workflows as I learn more about
the delve CLI. So, watch this space for updates.

### Install Delve

The first step is to install delve. You can install delve using the following
command:

```sh
go install github.com/go-delve/delve/cmd/dlv@latest
```

### Sample Go program

### Running the program with delve

#### Running with arguments

### Attaching to a running process

