---
title: "Initialization Loop in Golang"
date: "2021-08-22"
tags: [ golang ]
---

# Initialization Loop in Golang

A couple of days ago, I was writing a program in Go and ran into an `initialization loop`. I was able to quickly fix it with 1 google search which landed on [this StackOverflow question](https://stackoverflow.com/questions/51667411/initialization-loop-golang). But it didn't explain **what** an init loop is and **why** it occurs. So, this post is an attempt to explain the what and the why.

#### Example of an init loop

```go
package main

var (
  globalFunc = func1
)

func main() {}

func func1() {
  func2()
}

func func2() {
  globalFunc()
} 
```

Trying to compile the above code will give you this error:
```
./main.go:4:2: initialization loop:
        /tmp/test/main.go:4:2: globalFunc refers to
        /tmp/test/main.go:9:6: func1 refers to
        /tmp/test/main.go:13:6: func2 refers to
        /tmp/test/main.go:4:2: globalFunc
```

#### The What

Looking at the error message, it should be quite clear **what** an initialization loop is. `globalFunc` refers to `func1`, `func1` refers to `func2`, `func2` refers to `globalFunc` - creating a loop. The problem is not referencing things in a loop. The problem is while initializing things. The compiler can't decide **what** to initialize first. That's why it refuses to compile the code and throws an error.

#### The Why

To understand why the compiler can't decide what to initialize first, you'll need to understand what order the compiler initializes things in.

**The order of initialization in Go**

1. Imported packages
2. Globally declared variables/constants
3. `init()` function

Within the global variables, the order depends on references. If one variable is referencing another, the **referenced** variable is initialized first. Example:

```go
var (
  a = b / 10
  b = 100 // initialised first
)
```

Here, `b` is initialized first because `a` depends on it. But if the variables are **not** dependant on each other, they will be initialized in the order they are declared in.

```go
var (
  a = 10 // initilized first
  b = 100
)
```

When the dependency of variables forms a loop, it throws the error (like the first code snippet). 

```go
var (
  a = b / 10
  b = a * 10
)

// compiler: lol 🤣
```

So, how do we fix this?<br>

#### The Solution
*Enter `init()` function*

When the dependency of variables forms a loop, the order of initialization can be enforced using the init function. What that means is, the variables should just be declared globally and the *initialization* should be done in the init function. So, the corrected first snippet would look something like this:

```go
package main

var (
  globalFunc func() // declaration with func() as type
)

func init() {
  globalFunc = func1 // initialize value
}

func main() {}

func func1() {
  func2()
}

func func2() {
  globalFunc()
}

// compiler: 🤠
```

Simpler example:

```go
var (
  a, b int
)

func init() {
  a = b / 10
  b = a * 10
}
```

---

This is probably a very fundamental and obvious concept to many people. But I encountered this error for the first time. I thought writing a mini blog post about it would help me (and hopefully more Golang noobs) understand it a little better. If you spot a mistake in what I've explained or see a typo, [slide into my twitter DM](https://twitter.com/messages/131552332-131552332?recipient_id=131552332&text=hi). Thanks 🙏🏽

#### References

- https://github.com/golang/go/issues/1817
- https://golang.org/doc/effective_go#initialization 
