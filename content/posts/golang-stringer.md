---
title: "Using Golang's Stringer tool"
date: 2020-01-28
tags: [ golang, tools, good-practices ]
draft: true
---

**Straight from the documentation:**
>
> Stringer is a tool to automate the creation of methods that satisfy the fmt.Stringer interface. Given the name of a (signed or unsigned) integer type T that has constants defined, stringer will create a new self-contained Go source file implementing:
> # func (t T) String() string
> The file is created in the same package and directory as the package that defines T. It has helpful defaults designed for use with go generate.

Stringer is among other Golang tools which help us in writing good go code. This is a CLI tool which is used via `go generate`. Go generate is another tool that comes with go. It is used for auto-generating code. You can explore more about it <a href="https://golang.org/pkg/cmd/go/internal/generate/" target="_blank" rel="noreferrer">in their documentation</a>.

So, we use the stringer command with go generate to generate the code necessary to implement fmt’s stringer interface. Conceptually this is very simple. But the documentation for stringer is, well there is no documentation. There is only a help flag in the stringer command which only lists the available flags we can use with stringer. These flags are very useful but are ignored by many people. They give us control over how the final output string is formatted.

## What stringer is used for

Stringer is generally used to implement the concept of enumeration while avoiding hard-coding of the string values. Enumeration or enum is when you want to define a finite and fixed set of values of a given type. For example, types of dishes in a menu (appetizers, main course, desserts), types of pokemon (grass, water, fire, ..), etc.

So, when we want to use these defined sets of values, we should avoid hard coding them as it can lead to human errors like spelling mistakes. If we use something like stringer, we will generate the values once and make sure there are no errors. After that, we can just use them without worrying about human errors.

## Hands-on

The types that we define as enums will be extending `int`. So, when we declare the variables for each element, they will hold `int` values (value1 = 1, value2 = 2, etc). These `int` values will be used by stringer internally to index the values. But, we don’t have to manually initialise the `int` value for each of the elements. Go provides an identifier called `iota` to incrementally initialise `int` values. Let’s look at an example for `iota`.

type Sample int

```go
const (
	value1 Sample = iota
	value2
	value3
	value4
)

// or if you want the values
// to start from 1

const (
	value5 Sample = iota + 1
	value6
	value7
	value8
)
```

Let's go over each of the flags stringer has and see how they can be used with some examples.

### -type

`-type` is a compulsory argument which defines which type the string belongs to. This argument also supports a list of comma-separated type names. The `String()` method will be generated for all the given types. But this method’s definition will be put in a separate file. This file will by default be named `<type>_string.go` . Let’s look at an example for the `-type` :

```go
type HeroType int
type AttackType int

const (
	Strength HeroType = iota + 1
	Agility
	Intelligence
)

const (
	Melee AttackType = iota + 1
	Ranged
)

//go:generate stringer -type=HeroType,AttackType
```

Both the String() definitions will be put in a single file called herotype_string.go . If we want them to be in separate files, we will need to have two go generate comments like this:

```go
//go:generate stringer -type=HeroType
//go:generate stringer -type=AttackType
```

This will create two files: `herotype_string.go` and `attacktype_string.go` . To generate these files, we need to run the command `go generate` in the same directory. This will create the files. And every time we run go generate , these files will be regenerated. So, it is important that we do not edit these generated files manually as they will get overwritten.

### -output

`-output` flag is used to explicitly specify the name of the file what will be generated. This will override the default name `<type>_string.go` . That’s pretty much all this flag does. So, for the above example, if we wanted to put both the type’s generations into a single file called `hero-attack_string.go`, we can use the `-output` flag like this:

```go
//go:generate stringer -type=HeroType,AttackType -output=hero-attack_string.go
```

This will generate the single  `hero-attack_string.go` with both the `String()` definitions.

### -trimprefix

Sometimes, we would want to name the enum variables descriptively with a prefix, to make the code more readable (Ex: `HeroTypeAgility` instead of just `Agility`). But this exact name would get reflected in the final output string. We can use the `-trimprefix` to avoid this and trim the prefix before generating the final string output. This will trim the specified prefix and only use the rest of the text as the value.

```go
type HeroType int

//go:generate stringer -type=HeroType -trimprefix=HeroType
const (
    HeroTypeStrength HeroType = iota + 1
    HeroTypeAgility
    HeroTypeIntelligence
)
```

This will generate the `String()` function which return the above values with “HeroType” trimmed off: “Strength”, “Agility”, “Intelligence”

### -linecomment

This flag, like `trimprefix` is also used for customising what the `String()` function returns.`trimprefix` only lets you trim of the prefix of the value, but this flag lets you set WHATEVER value you want to a particular object of that type. This custom value is set by adding a comment on the same line as the object, with the value you want to set. Example:

```go
type Artist int

//go:generate stringer -type=Artist -linecomment
const (
    ArtistLedZeppelin Artist = iota + 1 // led-zepplin
    ArtistPinkFloyd                     // pink-floyd
    ArtistPostMalone                    // post-malone
)
```

This will generate enums with the values: “led-zeppelin”, “pink-floyd” and “post-malone”. This way, we can have “-” in the string value. `linecomment` is generally used in cases like this when we want to have special characters, start the value with a lower case, keep the variable camel-case and the values snake-case etc.
> NOTE: The comment has to be on the same line. And the space after // is ignored

### -tags

This flag is used to specify the build tags. These build tags are used for conditionally generate the `String()` function. I am not very sure about how to specifically use this. I tried to find out, but couldn’t find much online. If you know any examples, please comment below.

These are the flags available in `stringer`. This is a fairly simple tool to use. Hope this post give you more clarity about it.

