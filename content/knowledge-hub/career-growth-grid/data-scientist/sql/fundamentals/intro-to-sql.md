---
title: "SQL Basics - Getting Started with Databases"
description: "Learn SQL fundamentals, SELECT statements, WHERE clauses, and basic database queries"
image: "/img/sql-basics.png"
type: "article"
resources:
  - name: "SQL Cheat Sheet PDF"
    link: "https://example.com/sql-cheatsheet.pdf"
    type: "pdf"
  - name: "Sample Database SQL"
    link: "https://example.com/sample-db.sql"
    type: "pdf"
  - name: "Video Tutorial"
    link: "https://youtube.com/watch?v=sql-basics"
    type: "video"
---

## What is SQL?

SQL (Structured Query Language) is the standard language for managing and manipulating databases. It allows you to create, read, update, and delete data efficiently.

## Basic SELECT Statement

The SELECT statement is used to retrieve data from a database.

```sql
-- Retrieve all columns from a table
SELECT * FROM employees;

-- Retrieve specific columns
SELECT first_name, last_name, salary FROM employees;

-- Give columns an alias
SELECT first_name AS 'First Name', salary AS 'Annual Salary' FROM employees;
```

## WHERE Clause

Filter data based on specific conditions.

```sql
-- Simple condition
SELECT * FROM employees WHERE salary > 50000;

-- Multiple conditions
SELECT * FROM employees WHERE salary > 50000 AND department = 'IT';

-- Using OR
SELECT * FROM employees WHERE department = 'IT' OR department = 'HR';

-- NOT operator
SELECT * FROM employees WHERE NOT department = 'Marketing';
```

## Comparison Operators

- `=` - Equal
- `!=` or `<>` - Not equal
- `>` - Greater than
- `<` - Less than
- `>=` - Greater than or equal
- `<=` - Less than or equal
- `BETWEEN` - Within a range
- `IN` - Matches any value in a list
- `LIKE` - Pattern matching

## LIKE Pattern Matching

```sql
-- Starts with 'A'
SELECT * FROM employees WHERE first_name LIKE 'A%';

-- Contains 'John'
SELECT * FROM employees WHERE first_name LIKE '%John%';

-- Ends with 'son'
SELECT * FROM employees WHERE last_name LIKE '%son';
```

## ORDER BY Clause

Sort query results.

```sql
-- Sort ascending (default)
SELECT * FROM employees ORDER BY salary;

-- Sort descending
SELECT * FROM employees ORDER BY salary DESC;

-- Sort by multiple columns
SELECT * FROM employees ORDER BY department, salary DESC;
```

## Key Takeaways
- SELECT retrieves data from tables
- WHERE filters data based on conditions
- ORDER BY sorts results
- Master these basics before moving to advanced queries
