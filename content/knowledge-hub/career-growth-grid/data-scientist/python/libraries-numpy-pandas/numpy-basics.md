---
title: "NumPy - Numerical Computing with Python"
description: "Learn array operations and numerical computations with NumPy"
image: "/img/python-numpy.png"
type: "article"
resources:
  - name: "NumPy Cheat Sheet"
    link: "https://example.com/numpy-cheatsheet.pdf"
    type: "pdf"
  - name: "NumPy Colab Exercises"
    link: "https://colab.research.google.com/drive/numpy-notebook"
    type: "colab"
  - name: "Video Series"
    link: "https://youtube.com/watch?v=numpy-tutorial"
    type: "video"
---

## NumPy Arrays

```python
import numpy as np

# Creating arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros((3, 3))
arr3 = np.ones((2, 4))
arr4 = np.arange(0, 10, 2)
arr5 = np.linspace(0, 1, 5)

print(arr1.shape)    # (5,)
print(arr2.dtype)    # float64
```

## Array Operations

```python
# Element-wise operations
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(a + b)         # [5, 7, 9]
print(a * b)         # [4, 10, 18]
print(a ** 2)        # [1, 4, 9]

# Matrix operations
matrix1 = np.array([[1, 2], [3, 4]])
matrix2 = np.array([[5, 6], [7, 8]])

dot_product = np.dot(matrix1, matrix2)
```

## Useful Functions

```python
arr = np.array([1, 5, 3, 8, 2, 9])

# Statistics
print(np.mean(arr))     # Average
print(np.std(arr))      # Standard deviation
print(np.min(arr))      # Minimum
print(np.max(arr))      # Maximum
print(np.sum(arr))      # Sum

# Sorting and indexing
sorted_arr = np.sort(arr)
indices = np.argsort(arr)
```

## Indexing and Slicing

```python
arr = np.array([10, 20, 30, 40, 50])

print(arr[0])       # 10
print(arr[1:4])     # [20, 30, 40]
print(arr[-1])      # 50

# 2D array indexing
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(matrix[0, 1]) # 2
print(matrix[1, :]) # [4, 5, 6]
```

## NumPy in Data Science
NumPy is fundamental for:
- Data manipulation and cleaning
- Mathematical computations
- Foundation for Pandas and Scikit-learn
