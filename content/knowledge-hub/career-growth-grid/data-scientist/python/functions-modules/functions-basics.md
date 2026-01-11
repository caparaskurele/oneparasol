---
title: "Functions - Creating Reusable Code"
description: "Master function definition, parameters, and return values"
image: "/img/python-functions.png"
type: "article"
resources:
  - name: "Functions Reference PDF"
    link: "https://example.com/functions.pdf"
    type: "pdf"
  - name: "Colab Exercises"
    link: "https://colab.research.google.com/drive/functions-notebook"
    type: "colab"
  - name: "Video Tutorial"
    link: "https://youtube.com/watch?v=python-functions"
    type: "video"
---

## Function Basics
Functions are reusable blocks of code that perform a specific task.

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
```

## Parameters and Arguments

```python
# Default parameters
def introduce(name, age=20):
    print(f"{name} is {age} years old")

introduce("John")           # Uses default age
introduce("Jane", 25)       # Custom age

# Multiple return values
def get_user_info():
    return "John", 25, "john@example.com"

name, age, email = get_user_info()

# Variable-length arguments
def sum_numbers(*args):
    return sum(args)

print(sum_numbers(1, 2, 3, 4, 5))  # 15

# Keyword arguments
def create_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="John", age=25, city="NYC")
```

## Scope and Lifetime

```python
global_var = "I'm global"

def my_function():
    local_var = "I'm local"
    print(global_var)  # Can access global
    print(local_var)   # Local to function

my_function()
# print(local_var)  # Error: local_var not defined outside function
```

## Lambda Functions
Anonymous functions for simple operations.

```python
square = lambda x: x ** 2
print(square(5))  # 25

numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
```
