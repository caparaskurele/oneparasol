---
title: "Pandas - Data Analysis and Manipulation"
description: "Master DataFrames and data analysis with Pandas"
image: "/img/python-pandas.png"
type: "article"
resources:
  - name: "Pandas Guide PDF"
    link: "https://example.com/pandas-guide.pdf"
    type: "pdf"
  - name: "Pandas Colab Practice"
    link: "https://colab.research.google.com/drive/pandas-notebook"
    type: "colab"
  - name: "Tutorial Videos"
    link: "https://youtube.com/watch?v=pandas-tutorial"
    type: "video"
---

## DataFrames
The core data structure in Pandas.

```python
import pandas as pd

# Creating a DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 28],
    'City': ['NYC', 'LA', 'Chicago']
}
df = pd.DataFrame(data)

# From CSV
df = pd.read_csv('data.csv')

# Basic info
print(df.head())        # First 5 rows
print(df.info())        # Data types and missing values
print(df.describe())    # Statistical summary
```

## Accessing Data

```python
# Column access
ages = df['Age']
names = df[['Name', 'City']]

# Row access
row = df.iloc[0]        # By position
row = df.loc[0]         # By label

# Filtering
young_people = df[df['Age'] < 30]
```

## Data Manipulation

```python
# Adding columns
df['Salary'] = [50000, 60000, 55000]

# Renaming
df.rename(columns={'Name': 'FullName'})

# Handling missing values
df.fillna(0)
df.dropna()

# Sorting
df.sort_values('Age')
```

## Grouping and Aggregation

```python
# Group by
grouped = df.groupby('City')['Age'].mean()

# Multiple operations
summary = df.groupby('City').agg({
    'Age': 'mean',
    'Salary': 'sum'
})
```

## Common Methods
- `merge()` - Combine DataFrames
- `concat()` - Stack DataFrames
- `pivot_table()` - Reshape data
- `apply()` - Apply functions

## Exporting Data

```python
# Save to CSV
df.to_csv('output.csv', index=False)

# Save to Excel
df.to_excel('output.xlsx')

# Save to JSON
df.to_json('output.json')
```
