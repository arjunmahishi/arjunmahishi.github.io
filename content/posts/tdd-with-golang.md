---
title: "Test-driven development with Golang"
date: "2018-07-31"
tags: [ golang, good-practices  ]
---

# Test-driven development with Golang

Testing — An activity hated by most human beings
 Testing is an investigation done to make sure that the code we have written is reliable and meets the given requirements. The most common way to test code is to write unit tests for different units of the codebase. This makes it easy to isolate the bugs. All of the software development processes include testing as an integral part. The one we are going to talk about today is called Test Driven Development or TDD in short.

*Test-driven development is a process where unit tests are written before writing any code*. And the code is written only to pass those tests. I know this sounds stupid, but believe me, this is a very effective software development practice. This practice ensures that we only write code that is absolutely required. So, our code is very minimalistic and meets all requirements.

The general idea of TDD is, get requirements, write a test case assuming that there is code fulfilling it, write code to pass the test case. And this process is repeated until all the requirements are met. As you can see, this is a very iterative process. These 3 steps are better known as the 3 laws of test-driven development coined by Robert Cecil Martin (uncle bob). Uncle Bob is one of the living legends of programming. I recommend following his work if you are into good practices in programming.

![tdd block diagram](https://cdn-images-1.medium.com/max/2000/0*GwgigPSmb7WBWEdD.png)

## The 3 laws of test-driven development are formally stated as follows

1. You can’t write any production code until you have first written a failing unit test
2. You can’t write more of a unit test than is sufficient to fail, and not compiling is failing
3. You can’t write more production code than is sufficient to pass the currently failing unit test

Enough of theory let’s take up an example and actually try it hands-on. We will be using Golang to implement this concept.

## Hands-on

Let’s build a simple function to list the multiples of 3 and 5 within a given range of numbers. This is a fairly simple problem to solve. Let’s look at the code step by step.

* Create a package called `tdd`
* Now, we will need two files in this package: `tdd.go` and `tdd_test.go`. `tdd.go` will contain the main code and `tdd_test.go` will contain the test cases.
* We are going to use a library called `testify` to write test cases. It’s very straight forward and easy to understand. First, let’s install the library by running
`go get github.com/stretchr/testify`
* Let's look at the requirements for writing the function.
  - Return multiples of 3
  - Return multiples of 5 along with it
  - Return empty slice if multiples of 3 and 5 are not found
* According to the laws of TDD, we have to write the test case first. So let’s take the first requirement and write a test case for it. In tdd_test.go, make a function called `TestMultiples()`. And as usual, the argument of this function should be the T object of the builtin package called testing.
* In this function, we are going to write the test cases for the function `Multiples()` which we will write later. Now, let's write our test case for the first requirement (assuming `Multiples()` already exists). Using the `assert.Equal()` let's see if calling `Multiples(1, 5)` will give us a slice containing 3 (which is the only multiple of 3 between 1 and 5). The code should look like this.

```go
func TestMultiples(t *testing.T) {
    // Return multiples of 3
    assert.Equal(t, []int{3}, Multiples(1, 5))
}
```

* Run the test by running `go test` in the terminal. This test will obviously fail. Now, we write some code to pass this test.
* Go to the `tdd.go` file and declare a function called `Multiples()`. Take `(m, n int)` and the arguments as expected by the test case. That defines the range of numbers. We need to look for multiples within this range. Now, the test case expects to get multiples of 3. Multiples of 3 means if the number is divided by 3, it should not give any reminder. So, let's iterate through all the numbers between m and n, and return all the numbers that fit.

```go
func Multiples(m, n int) []int {
    result := []int{}
    for i := m; i < n; i++ {
        if i%3 == 0 {
            result = append(result, i)
        }
    }
    return result
}
```

* If you run the test case now, you will see that it passes! (Think about it. Was it not oddly satisfying?). Since the test case passes, go back to write a new test case.
* The next requirement is to also include multiples of 5. So, in our new test case, let call `Multiples(4, 11)` and expect it to return `[5, 6, 9, 10]`. Write the test case and run the test to see that it fails.

```go
func TestMultiples(t *testing.T) {
    // Return multiples of 3
    assert.Equal(t, []int{3}, Multiples(1, 5))

    // Return multiples of 5 also
    assert.Equal(t, []int{5, 6, 9, 10}, Multiples(4, 11))
}
```

* In `Multiples()` function, we just have to add another condition to also include multiples of 5. Update the if condition to do so. And run the test again. It should pass now.

```go
func Multiples(m, n int) []int {
    result := []int{}
    for i := m; i < n; i++ {
        if i%3 == 0 || i%5 == 0 {
            result = append(result, i)
        }
    }
    return result
}
```

* Now for the last test case. The requirement is to make sure we return an empty slice if no multiples are found. Write the test case to expect `Multiples(1, 3)` to return an empty slice and run the test.

```go
func TestMultiples(t *testing.T) {
    // Return multiples of 3
    assert.Equal(t, []int{3}, Multiples(1, 5))

    // Return multiples of 5 also
    assert.Equal(t, []int{5, 6, 9, 10}, Multiples(4, 11))

    // Return empty slice if multiples not found
    assert.Empty(t, []int{}, Multiples(1, 3))
}
```

You will see that this test case passes without having to write any code. Congratulations!

This process is long and pointless for a small problem like this. But when you write complicated code that affects millions of people, this process could save your life. Sure it’s a bit slow. But since you are writing good and clean code, you will never be slowed down by bad code. Also, the test coverage will be pretty high when you follow TDD. In fact, in our case, it is 100%.

So, this was Test-driven development in a nutshell. Hope this post gave you a perspective on how TDD could be useful. This may not be the most efficient way when you have a deadline, but it is definitely the most foolproof way to write clean code.

