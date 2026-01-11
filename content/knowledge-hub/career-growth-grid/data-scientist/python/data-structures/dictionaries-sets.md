---
title: "Dictionaries and Sets - Key-Value and Unique Collections"
description: "Learn about dictionaries and sets for storing and managing data efficiently"
image: "/img/python-dict-sets.png"
type: "article"
resources:
  - name: "Dict & Sets Guide PDF"
    link: "https://example.com/dict-sets.pdf"
    type: "pdf"
  - name: "Practice Colab Notebook"
    link: "https://colab.research.google.com/drive/dict-sets-notebook"
    type: "colab"
---

## Dictionaries
Dictionaries store key-value pairs.

```python
# Creating a dictionary
student = {
    "name": "John",
    "age": 20,
    "major": "Computer Science"
}

# Accessing values
print(student["name"])  # John

# Adding/Updating
student["gpa"] = 3.8

# Dictionary methods
student.keys()    # Get all keys
student.values()  # Get all values
student.items()   # Get key-value pairs

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}
```

## Sets
Sets are unordered collections of unique items.

```python
# Creating a set
colors = {"red", "green", "blue"}

# Adding elements
colors.add("yellow")

# Removing elements
colors.remove("red")

# Set operations
set1 = {1, 2, 3}
set2 = {2, 3, 4}

union = set1 | set2          # {1, 2, 3, 4}
intersection = set1 & set2   # {2, 3}
difference = set1 - set2     # {1}
```

## When to Use What
- **Lists**: Ordered, mutable, allows duplicates
- **Tuples**: Ordered, immutable, allows duplicates
- **Dictionaries**: Key-value pairs, fast lookups
- **Sets**: Unique items, fast membership testing
