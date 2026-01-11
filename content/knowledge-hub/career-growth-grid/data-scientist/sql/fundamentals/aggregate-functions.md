---
title: "Aggregate Functions - COUNT, SUM, AVG, MIN, MAX"
description: "Master aggregate functions for data summarization and analysis"
image: "/img/sql-functions.png"
type: "article"
resources:
  - name: "Aggregate Functions Guide PDF"
    link: "https://example.com/aggregate-functions.pdf"
    type: "pdf"
  - name: "Practice SQL Queries"
    link: "https://example.com/practice-queries.sql"
    type: "pdf"
---

## COUNT Function

Returns the number of rows that match a condition.

```sql
-- Count all rows
SELECT COUNT(*) FROM employees;

-- Count non-null values
SELECT COUNT(salary) FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) FROM employees;

-- Count with condition
SELECT COUNT(*) FROM employees WHERE salary > 60000;
```

## SUM Function

Calculates the total of a numeric column.

```sql
-- Total salary
SELECT SUM(salary) FROM employees;

-- Total salary by department
SELECT department, SUM(salary) AS total_salary 
FROM employees 
GROUP BY department;

-- Sum with condition
SELECT SUM(salary) FROM employees WHERE department = 'IT';
```

## AVG Function

Calculates the average value.

```sql
-- Average salary
SELECT AVG(salary) FROM employees;

-- Average salary per department
SELECT department, AVG(salary) AS avg_salary 
FROM employees 
GROUP BY department;
```

## MIN and MAX Functions

Find the minimum and maximum values.

```sql
-- Minimum salary
SELECT MIN(salary) FROM employees;

-- Maximum salary
SELECT MAX(salary) FROM employees;

-- Min and Max together
SELECT 
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary,
    AVG(salary) AS avg_salary
FROM employees;
```

## GROUP BY Clause

Groups data and applies aggregate functions.

```sql
-- Count employees per department
SELECT department, COUNT(*) AS employee_count 
FROM employees 
GROUP BY department;

-- Total and average salary by department
SELECT 
    department,
    COUNT(*) AS num_employees,
    SUM(salary) AS total_salary,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

## HAVING Clause

Filter grouped data (like WHERE for GROUP BY).

```sql
-- Departments with more than 5 employees
SELECT 
    department, 
    COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- Departments with average salary over 60000
SELECT 
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
```

## Practical Example

```sql
SELECT 
    department,
    COUNT(*) AS num_employees,
    MIN(salary) AS lowest_salary,
    MAX(salary) AS highest_salary,
    AVG(salary) AS average_salary,
    SUM(salary) AS total_payroll
FROM employees
GROUP BY department
HAVING COUNT(*) > 2
ORDER BY avg_salary DESC;
```

This query provides comprehensive salary analysis per department!
