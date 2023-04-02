---
title: "Tapping into the system clipboard"
date: "2021-07-11"
tags: [ vim ]
---

# Tapping into the system clipboard

### TL;DR

```vim
vmap <leader>y "*y
nmap <leader>p "*p
```

### Challenge

Copying text to and from vim and the outside world is a pain in the ass. This is because vim's default register where it stores text copied with `y` is scoped only to that perticular vim session.

### Solution

Add this to your vimrc/init.vim:

```vim
vmap <leader>y "*y
nmap <leader>p "*p
```

This is basically mapping `<leader> + y` to run the `"*y` command. The `"` tells vim which register to use, `*` is the register that is shared with the system clipboard and `y` is the action (copy). Same goes for pasting.

That's it!<br>
Happy plagiarism :P
