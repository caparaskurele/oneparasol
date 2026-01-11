---
title: "Control Flow - If, Loops, and Conditionals"
description: "Master decision making and loops in Python with practical examples"
image: "/img/python-control-flow.png"
type: "article"
resources:
  - name: "Control Flow Notes PDF"
    link: "https://example.com/control-flow.pdf"
    type: "pdf"
  - name: "Colab Practice Notebook"
    link: "https://colab.research.google.com/drive/control-flow-notebook"
    type: "colab"
---

## Control Flow Structures

### If Statements
Make decisions in your code based on conditions.

```python
age = 18
if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")
```

### For Loops
Iterate over sequences like lists and ranges.

```python
for i in range(5):
    print(f"Number: {i}")

names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(f"Hello, {name}!")
```

### While Loops
Execute code as long as a condition is true.

```python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
```

## Best Practices
- Use meaningful variable names
- Keep conditions simple and readable
- Avoid infinite loops
- Use break and continue wisely
