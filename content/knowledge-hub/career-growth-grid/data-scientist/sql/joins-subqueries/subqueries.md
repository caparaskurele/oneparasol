---
title: "Subqueries and Nested Queries"
description: "Use subqueries to solve complex data retrieval problems"
image: "/img/sql-subqueries.png"
type: "article"
resources:
  - name: "Subqueries Guide PDF"
    link: "https://example.com/subqueries.pdf"
    type: "pdf"
  - name: "Complex Query Examples"
    link: "https://example.com/complex-queries.sql"
    type: "pdf"
---

## Scalar Subquery (Returns Single Value)

```sql
-- Find employee with highest salary
SELECT * FROM employees 
WHERE salary = (SELECT MAX(salary) FROM employees);

-- Find employees earning above average
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

## Row Subquery (Returns One Row, Multiple Columns)

```sql
-- Find employees with same salary and department as John
SELECT * FROM employees
WHERE (salary, department) = (
    SELECT salary, department FROM employees 
    WHERE first_name = 'John'
);
```

## Table Subquery (Returns Multiple Rows/Columns)

```sql
-- Find all departments with employees earning > 70000
SELECT DISTINCT department FROM employees
WHERE department IN (
    SELECT department FROM employees 
    WHERE salary > 70000
);

-- Get employee details using table subquery
SELECT * FROM (
    SELECT id, first_name, salary FROM employees
    WHERE salary > 50000
) AS high_earners;
```

## Correlated Subquery

References columns from outer query.

```sql
-- Find employees earning more than their department average
SELECT * FROM employees e1
WHERE salary > (
    SELECT AVG(salary) FROM employees e2
    WHERE e2.department = e1.department
);
```

## EXISTS and NOT EXISTS

Check if subquery returns any rows.

```sql
-- Find departments with at least one employee
SELECT DISTINCT department FROM employees e1
WHERE EXISTS (
    SELECT 1 FROM employees e2 
    WHERE e2.department = e1.department
);

-- Find departments with no employees
SELECT * FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e
    WHERE e.department_id = d.id
);
```

## IN vs JOIN Performance

```sql
-- Using subquery with IN
SELECT * FROM employees 
WHERE department_id IN (
    SELECT id FROM departments WHERE location = 'New York'
);

-- Equivalent JOIN (often more efficient)
SELECT e.* FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE d.location = 'New York';
```

## Common Table Expression (CTE)

```sql
-- Define a temporary result set
WITH high_earners AS (
    SELECT id, first_name, salary 
    FROM employees 
    WHERE salary > 60000
)
SELECT * FROM high_earners
ORDER BY salary DESC;

-- Multiple CTEs
WITH dept_summary AS (
    SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department
),
high_salary_depts AS (
    SELECT department FROM dept_summary WHERE avg_sal > 55000
)
SELECT * FROM high_salary_depts;
```

## When to Use Each

- **Scalar Subquery**: Single value comparison
- **IN**: Check if value exists in list
- **EXISTS**: Better for checking existence
- **JOIN**: Usually more efficient for combining tables
- **CTE**: Complex logic, multiple references
