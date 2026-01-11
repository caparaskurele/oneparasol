---
title: "Lists and Tuples - Working with Collections"
description: "Understand Python's fundamental collection data types"
image: "/img/python-collections.png"
type: "article"
resources:
  - name: "Collections Cheat Sheet"
    link: "https://example.com/collections-cheatsheet.pdf"
    type: "pdf"
  - name: "Interactive Colab Exercise"
    link: "https://colab.research.google.com/drive/lists-tuples-notebook"
    type: "colab"
  - name: "Tutorial Video"
    link: "https://youtube.com/watch?v=lists-tuples"
    type: "video"
---

## Lists
Lists are mutable collections of items.

```python
# Creating a list
fruits = ["apple", "banana", "cherry"]

# Accessing elements
print(fruits[0])  # apple

# Adding elements
fruits.append("date")

# Removing elements
fruits.remove("banana")

# List comprehension
numbers = [x**2 for x in range(5)]
```

## Tuples
Tuples are immutable collections of items.

```python
# Creating a tuple
coordinates = (10, 20)

# Accessing elements
x, y = coordinates

# Tuples are immutable
# coordinates[0] = 30  # This will raise an error
```

## Common Methods

### List Methods
- `append()` - Add item
- `extend()` - Add multiple items
- `insert()` - Insert at specific position
- `remove()` - Remove by value
- `pop()` - Remove by index

### Useful Functions
- `len()` - Get length
- `sorted()` - Sort items
- `reversed()` - Reverse order
- `sum()` - Sum numeric items
