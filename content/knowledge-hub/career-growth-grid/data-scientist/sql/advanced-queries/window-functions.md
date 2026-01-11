---
title: "Advanced SQL - Window Functions and Analytics"
description: "Perform advanced analytics with window functions and ranking"
image: "/img/sql-advanced.png"
type: "article"
resources:
  - name: "Window Functions PDF"
    link: "https://example.com/window-functions.pdf"
    type: "pdf"
  - name: "Analytics Queries"
    link: "https://example.com/analytics.sql"
    type: "pdf"
  - name: "Tutorial Video"
    link: "https://youtube.com/watch?v=window-functions"
    type: "video"
---

## ROW_NUMBER()

Assigns a unique number to each row.

```sql
SELECT 
    first_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
```

## RANK() and DENSE_RANK()

Ranking functions with different handling of ties.

```sql
SELECT 
    first_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
```

## PARTITION BY

Divide results into groups.

```sql
-- Rank within each department
SELECT 
    first_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
```

## LAG() and LEAD()

Access previous and next row values.

```sql
-- Compare salary with previous employee
SELECT 
    first_name,
    salary,
    LAG(salary, 1) OVER (ORDER BY hire_date) AS previous_salary,
    LEAD(salary, 1) OVER (ORDER BY hire_date) AS next_salary,
    salary - LAG(salary, 1) OVER (ORDER BY hire_date) AS salary_change
FROM employees;
```

## Aggregate Window Functions

```sql
-- Running total
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- Comparison to average
SELECT 
    first_name,
    salary,
    AVG(salary) OVER () AS avg_salary,
    salary - AVG(salary) OVER () AS diff_from_avg
FROM employees;
```

## FRAME Specification

```sql
-- Moving average (current + 2 previous rows)
SELECT 
    sales_date,
    sales_amount,
    AVG(sales_amount) OVER (
        ORDER BY sales_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg
FROM daily_sales;
```

## NTILE()

Divide data into buckets.

```sql
-- Divide employees into 4 quartiles by salary
SELECT 
    first_name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile
FROM employees;
```

## Practical Example

```sql
WITH employee_stats AS (
    SELECT 
        first_name,
        department,
        salary,
        RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
        AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary,
        SUM(salary) OVER (PARTITION BY department) AS dept_total_salary
    FROM employees
)
SELECT 
    first_name,
    department,
    salary,
    dept_rank,
    dept_avg_salary,
    ROUND(salary - dept_avg_salary, 2) AS diff_from_dept_avg
FROM employee_stats
WHERE dept_rank <= 3
ORDER BY department, dept_rank;
```

## Performance Tips

- Window functions are very powerful but can be slow on large datasets
- Consider indexing the PARTITION BY and ORDER BY columns
- Use FILTER clause if available: `SUM(salary) FILTER (WHERE active = 1)`
- Test different window frame sizes for optimal performance
