---
title: "Rewriting my existing neovim config in lua"
date: 2021-11-05T11:44:01+05:30
tags: [ vim ]
---

I've been wanting to rewrite my neovim config in Lua for a really long time. I didn't really know why. Just wanted to do it. Lua has a more sane and intuitive syntax compared to vimscript. So, it ends up being easier to maintain, refactor and extend. Plus, I think the entire neovim community is moving forward in this direction. I am hearing good things about vimscript in vim9, but maybe that will be an opportunity for another such blog post.

This blog post is for you if you are thinking to move to lua but didn't know where to start or haven't thought about moving to lua yet or even if you just enjoy the occasional vim-related content.

### Do you need to be a lua expert?

Absolutely not, even after rewriting my entire config in lua, I still don't know even the most basic things like iterating over a list, creating a class (if classes are even there), etc. If you know basic programming and have gone through someone else's code before, you are good to go.

### Some basic lua to help get started

Here are some of the things you will encounter

Function syntax
```lua
function func_name(arg1)
  return "epic things"
end

func_name 'arg1 value' -- like ruby
```

Array syntax
```lua
arr1 = { 1, 2, 3 }
arr2 = { 'a', 'b', 'c' }
print(arr1[0])
```

Map syntax (called tables in lua)
```lua
tb1 = { key1 = 'val1', key2 = 'val2' }
print(tb1.key2)
```

Syntax to run vim script (required as not everything is supported yet in lua)
```lua
-- inline
vim.cmd = "echo 'hello world'"

-- multi-line
vim.cmd [[
  echo 'hello world'
  echo 'can't think of a better example'
]]

-- NOTE: multi-line strings in lua are defined with 
-- double square brackets `[[]]`
```


### Deep dive

##### Structure of the config file

> The lua config is kept in a file called `init.lua` in the `~/.config/nvim` directory (just like `init.vim`)

So far, I've kept the entire config in one file. This is mainly to make it more sharable. All you have to do to use my config is, copy-paste the entire file and run `vim +PlugInstall`. But this is not necessary. You can choose to organize it in separate files. In VimConf 2021, there was a speaker who maintained a separate file for configuring each plugin.

My config is divided into several blocks:

1. Plugins -- declare all the plugins with vim-plug
2. Basic vim settings -- these are the basic editor settings like enabling relative numbering, disabling highlighting, etc
3. Custom key mapping -- this is my favorite section, where all the remaps live
4. The remaining blocks are dedicated to individual plugin config

##### Basic settings

I have a bunch of settings that enable/disable vim features, set stuff, etc. Translating these to lua is very easy. Lua exposes each setting as a member of the `vim.opt`. So, setting the relative numbering would be `vim.opt.relativenumber = true`.

**More examples**

vimscript
```vim
set relativenumber
set number
set incsearch
set colorcolumn=121
set mouse=a
```

the lua equalent
```lua
vim.opt.relativenumber = true
vim.opt.number = true
vim.opt.incsearch = true
vim.opt.colorcolumn = '121'
vim.opt.mouse = 'a'
```

Similarly translated all the settings

Some things like `syntax enable` and `colorscheme onedark` were not available. So, I had to use inline vim script

```lua
vim.cmd 'syntax enable'
vim.cmd 'colorscheme onedark'
```

##### Custom key mapping

Like the settings, key mappings are also pretty easy. Lua provides the function `vim.api.nvim_set_keymap` to set custom key mapping. This function takes the mode, key, commands, etc as arguments.

```lua
-- global variables are modified like this
vim.g.mapleader = ' '

-- assign the function to a variable called map (cleaner)
local map = vim.api.nvim_set_keymap
-- define a table with noremap as true, which can be used for some of the mappings
local noremap = { noremap = true }

map('n', 'vv', ':vsplit<CR> l', {})
map('n', 'tt', ':tabnew<CR>', {})

map('n', '<leader>h', '<c-w>h', noremap)
map('n', '<leader>j', '<c-w>j', noremap)
map('n', '<leader>k', '<c-w>k', noremap)
map('n', '<leader>l', '<c-w>l', noremap)
```

The 'n' you see as the first arguement stands for *normal mode*. You can also have  'i' (insert), 'v' (visual) and 't' (terminal)

`autocmd` is still not supported in lua. So, they need to be defined in vimscript

```lua
vim.cmd [[
  au filetype json nmap <leader>f :%!jq '.' %<CR>
  au filetype hcl nmap <leader>f :%!hclfmt %<CR>
]]
```
(FYI: I've written [a blog post](https://arjunmahishi.com/vim-adventures/prettify-json/) that explains the above commands)

##### Configuring plugins

Most of my plugin config involved setting global values and key mappings. As mentioned earlier, vim global values are set in lua using `vim.g.<var name>`

vim config
```vim
let g:go_highlight_fields = 1
let g:go_highlight_functions = 1
let g:go_highlight_function_calls = 1
let g:go_highlight_operators = 1
let g:go_fmt_command = "goimports"
```

lua equalent
```lua
vim.g.go_highlight_fields = 1
vim.g.go_highlight_functions = 1
vim.g.go_highlight_function_calls = 1
vim.g.go_highlight_operators = 1
vim.g.go_fmt_command = "goimports"
```

If the config is complicated for any plugin, just dump it in `vim.cmd [[]]` :P

If the plugin was written in lua, it will usually have a setup function that you can call. Example:
```lua
require'nvim-treesitter.configs'.setup {
  ensure_installed = "maintained",
  highlight = {
    enable = true,
    additional_vim_regex_highlighting = false,
  },
}
```

### That's it!

Wasn't very complecated was it?

You can also have a hybrid config -- using both vimscript and lua. All you have to do is, create a new file to keep your vimscript in and import it in the `init.lua` file. I had done this for my coc config (until I stopped using it)
```lua
vim.cmd 'runtime! coc-config.vim'
```

I am not entirely sure if doing this is worth your time. So don't do this in the middle of work or if you are busy with something more important. For me, this was triggered by boredom + the Diwali holidays. Hope this helps.

[This](https://github.com/arjunmahishi/dotfiles/blob/e6db1db76ff5f886ddd7f91e830117e471078e07/common/init.lua) is my final `init.lua` at the time of writing this post (the link is to a specific commit)
