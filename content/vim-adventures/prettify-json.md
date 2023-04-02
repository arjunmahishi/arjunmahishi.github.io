---
title: "Prettify JSON in Vim"
date: "2021-10-10"
tags: [ vim ]
---

# Prettify JSON in Vim

### TL;DR

```vim
au filetype json nmap <leader>f :%!jq '.' %<CR>
```

### Challenge

If you have ever opened a large auto-generated JSON file, you probably would have wanted to pull your hair out. To be able to read it easily, you would have to copy the whole thing, open an online JSON formatting tool, paste it, get the formatted output and read it.

I knew that `jq` can be used on CLI to format JSON, so I wanted to use that from within vim to do the formatting and skip the above circus.

### Solution

If you are a regular vim user, then you probably also are a regular CLI user. So, there is a good chance that you have heard of `jq` and used it before. If not, [check it out here](https://stedolan.github.io/jq/) NOW!

On the CLI, the most common way to use `jq` to format JSON is with this command `jq '.' <file_name>`. This gives the entire JSON object with proper indentation. Try it:

```vim
echo '{"key1": "val1", "key2": "val2"}' | jq '.'
```

Now, how do we run this from within vim?

If you don't already know, vim has a command mode that allows you to run vim commands (more about it [here](https://www.freecodecamp.org/news/vim-editor-modes-explained/)). It also allows us to run bash commands. This is done by prefixing the command with a bang (`!`). Try running this `:!echo "hello world"` in command mode. Similarly, run the `jq` command:

```vim
:%!jq '.' %
```

Wondering what the hell `%` is for?

`%` refers to the current file's name. Try running `:!echo %`. It will print the current file's name. So, the `%` at the end is to pass the current file's name to the `jq` command as an argument. The first `%` tells vim to replace the contents of the current buffer with the output of the following command.

One final step -- create a key mapping so that you won't have to type the whole command every time. Add this to your vimrc/init.vim:

```vim
au filetype json nmap <leader>f :%!jq '.' %<CR>
```

This will map `, + f` (`,` is my `<leader>` key) to the above `jq` command when the file type is JSON.

Hope that helps :)
