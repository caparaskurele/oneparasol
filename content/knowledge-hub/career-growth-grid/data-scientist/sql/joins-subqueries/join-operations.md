---
title: "JOIN Operations - INNER, LEFT, RIGHT, FULL OUTER"
description: "Combine data from multiple tables using different JOIN types"
image: "/img/sql-joins.png"
type: "article"
resources:
  - name: "JOIN Diagrams PDF"
    link: "https://example.com/join-diagrams.pdf"
    type: "pdf"
  - name: "Sample Data SQL"
    link: "https://example.com/sample-joins.sql"
    type: "pdf"
---

## INNER JOIN

Returns records that have matching values in both tables.

```sql
SELECT 
    e.first_name, 
    e.last_name, 
    d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

## LEFT JOIN (LEFT OUTER JOIN)

Returns all records from the left table, and matched records from the right table.

```sql
SELECT 
    e.first_name, 
    e.last_name, 
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

## RIGHT JOIN (RIGHT OUTER JOIN)

Returns all records from the right table, and matched records from the left table.

```sql
SELECT 
    e.first_name, 
    e.last_name, 
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

## FULL OUTER JOIN

Returns all records when there's a match in either table.

```sql
SELECT 
    e.first_name, 
    e.last_name, 
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

## CROSS JOIN

Produces Cartesian product - combines every row from the first table with every row from the second.

```sql
SELECT 
    e.first_name, 
    p.project_name
FROM employees e
CROSS JOIN projects p;
```

## Multiple JOINs

Combine data from 3+ tables.

```sql
SELECT 
    e.first_name,
    d.department_name,
    p.project_name,
    pa.assignment_date
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN project_assignments pa ON e.id = pa.employee_id
INNER JOIN projects p ON pa.project_id = p.id;
```

## Self JOIN

Join a table to itself.

```sql
SELECT 
    e1.first_name AS Employee,
    e2.first_name AS Manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
```

## Visual Guide to JOINs

```
INNER JOIN:    [Matching parts only]
LEFT JOIN:     [All left + matching right]
RIGHT JOIN:    [All right + matching left]
FULL OUTER:    [Everything from both tables]
```

## Best Practices
- Always use table aliases for clarity
- Use meaningful ON conditions
- Consider performance with large datasets
- Document JOIN logic for maintainability
