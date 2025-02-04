---
title: "append: to copy or not to copy"
date: "2025-02-04"
tags: [ golang ]
---

## Part 1

I got to do some tricky string manipulation involving non-unicode characters
last week. While working on that, I came across an unexpected behaviour of the
`append` function in Go. Consider this code snippet:

```go
func main() {
	a := make([]byte, 1, 4)
	a[0] = 'A'
	fmt.Println(string(a)) // A

	b := append(a, 'B')
	fmt.Println(string(a)) // A
	fmt.Println(string(b)) // AB

	b[0] = 'C'
	fmt.Println(string(b)) // CB
	fmt.Println(string(a)) // ??
}
```

What will the last print statement print? Try to guess it before running the
code. Here's a link to the playground if you want to run it: https://go.dev/play/p/MUrcymmITef

This is the output of the code:

```
A
A
AB
CB
C 👈 WHAT!?
```

I always assumed that `append` would create a new slice and copy the elements
from the original slice to the new one. But apparently, that's not the case.
Append only creates a new slice if the capacity of the original slice is less
than the required capacity. In this case, the capacity of the original slice is
4 and the required capacity is 2 (what `a` already has + 'B'). So, `append`
just appends the new element to the same underlying slice that `a` is pointing
to.

But if you see the second print statement, it prints `A` instead of `AB`. This
is because `a` only has access the first element of the underlying array. Pay attention to the `make` call.

```go
a := make([]byte, 1, 4)
```

The second argument to `make` is the length of the slice and the third argument
is the capacity of the slice. So, even though memory of 4 bytes is allocated, `a`
only has access to the first byte. When `append` is called, it appends the new
element to the underlying array and returns a new slice. But `a` still points
to the first element of the underlying array. That's why we don't see 'B' in the
second print statement.

We notice the mutation of `a` when we change the first element of `b` to 'C'. This
change is reflected in `a` as well. This is why the last print statement prints
`C`.

---

## Part 2

Now, change the `make` call to `a := make([]byte, 4)` and run the code again.

```go
func main() {
	a := make([]byte, 4)
	a[0] = 'A'
	fmt.Println(string(a)) // A

	b := append(a, 'B')
	fmt.Println(string(a)) // A
	fmt.Println(string(b)) // AB

	b[0] = 'C'
	fmt.Println(string(b)) // CB
	fmt.Println(string(a)) // ??
}
```
Go playground: https://go.dev/play/p/8phhB2NtZze

This is the output of the code:

```
A
A
AB
CB
A
```

This was the second TIL.

When you do `make([]byte, 1, 4)`, you allocate 4 bytes of memory. And initialize
the **first byte to it's zero value**.

When you do `make([]byte, 4)`, you allocate 4 bytes of memory. And initialize
**all the bytes to their zero value**. This leaves no memory for `append` to
reuse. So, `append` creates a new slice with the same length and capacity as
the original slice. This is why the last print statement prints `A`.

---

I hope you found this as interesting as I did. This gave me a headache for a
while. But after figuring out the nuances, it felt good. I don't really have an
opinion on whether this behaviour is good or bad. But it's good to know that
this is how `append` works in Go.
