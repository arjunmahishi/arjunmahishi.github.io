---
title: "Returning Interfaces in Golang"
date: 2022-01-08T12:49:31+05:30
draft: true
---

This week I ran into an issue which reiterated a very common proverb in golang. Before I get into the proverb, I'll describe what the issue is, how I fixed it, and how I am planning to avoid running into similar bugs in the future

### The Bug

We found a couple of recovered panics in the logs. These panics were happening pretty frequently. This is what the panic message said:

> panic: interface conversion: interface {} is `nil`, not []\*typeName

From the panic message, it was pretty obvious that somewhere in the code we are trying to convert an `interface{}` to a specific array type when the value it actually `nil`. And the panic message also has a trace to the exact line where this conversion is taking place. This is a very common error and is easy to fix. But while debugging this, I encountered a smell in the code that led to this in the first place. This is what the code kind of looked like:

There is an interface with a single method which returns `interface{}`
```go
type I interface {
  fun() interface{}
}
```

There are two structs (`impl1` and `impl2`) that implement this above interface

```go
// impl1 implements I
type impl1 struct{}

func (i impl1) fun() interface{} {
  return nil
}
```

```go
// impl2 implements I
type impl2 struct{}

func (i impl2) fun() interface{} {
  return i.helper()
}

func (i impl2) helper() []*int {
  return nil
}
```

What do you think will be the output of the below code?

```go
func main() {
  var A, B I

  A = impl1{}
  B = impl2{}

  fmt.Println(A.fun().([]*int)) // statement 1
  fmt.Println(B.fun().([]*int)) // statement 2
}
```

As you can probably guess, `statement 1` panics and `statement 2` never gets executed. But what if `statement 1` wasn't there. What do you think would happen then?

```go
func main() {
  var B I

  B = impl2{}

  fmt.Println(B.fun().([]*int))
}
```

Whould this code panic?

It wouldn't. This code actually prints `[]` (empty slice). This can be made more clear by printing the `type` of the return values.

```go
func main() {
  var A, B I

  A = impl1{}
  B = impl2{}

  fmt.Println(reflect.TypeOf(A.fun())) // prints "<nil>"
  fmt.Println(reflect.TypeOf(B.fun())) // prints "[]*int"
}
```

This is because when you assign `nil` to a slice in go, it releases the underlying array to the garbage collector and resets the slice to its "zero value". Empty slices and treated the same as `nil`.

```go
var arr []int
arr == nil // evaluates to true
```

Since the `helper()` method of the struct `impl2` has the return type as `[]*int`, the `nil` returned acuires the type `[]*int` with "zero value"

### The Fix

There are two obvious fixes for this. The quick way and the right way. The quick way is, The `fun()` method of `impl1` should not return `nil`. Instead, it sould return an empty slice.

```go
type impl1 struct{}

func (i impl1) fun() interface{} {
  var arr []*int
  return arr
}
```

The "right way" is to consider re-writing this part of the code. I went with the quick way because there higher priority items to work on. But in the next section, I've written down the lessons I learnt because of this bug and potential way to refactor this code.

### Lessons learnt

It is very convinient to use `interface{}` where we want to **allow any type**. But it can cause a lot of unpredeictable behaviour. The empty interface is not a feature, it's a side effect of an other feature which is *implicit implementation of interfaces*. Since `interface{}` has no methods in it, every object in golang can conform to it.

Sure, it can be useful when you want to **accept any type** to be passed as an arguement to a function (like in `fmt.Println` and many others). It works out in this case because the treatment of the value passed is in the hands of the author of the function. If you are writing such a function, you would know exactly what kind of types to expect, and how to handle unexpected types. But when the function returns an empty `interface{}`, the user of the function has no idea of all the possible types that can come out. They will only know what type they expect and only handle that (leading to situations like above). 

The **need** to even return an empty interface exposes a design flaw in the code. 

This is where the famous Go proverb I talked about earlier comes in

> accept interfaces, return structs
