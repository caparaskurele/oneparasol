---
title: "Database Design - Tables, Keys, and Normalization"
description: "Design efficient and organized database schemas"
image: "/img/sql-design.png"
type: "article"
resources:
  - name: "Database Design PDF"
    link: "https://example.com/db-design.pdf"
    type: "pdf"
  - name: "Schema Examples"
    link: "https://example.com/schema-examples.sql"
    type: "pdf"
---

## Primary Keys

Uniquely identifies each row in a table.

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE
);
```

## Foreign Keys

Creates relationships between tables.

```sql
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

## Data Types

Choose appropriate data types for efficiency.

```sql
-- Numeric types
INT, BIGINT, DECIMAL(10,2), FLOAT, DOUBLE

-- String types
VARCHAR(255), CHAR(10), TEXT

-- Date/Time types
DATE, TIME, DATETIME, TIMESTAMP

-- Other types
BOOLEAN, JSON, BLOB
```

## Normalization

Organize data to reduce redundancy.

### First Normal Form (1NF)
- Each cell contains a single value
- No repeating groups

### Second Normal Form (2NF)
- In 1NF
- All non-key attributes depend on entire primary key

### Third Normal Form (3NF)
- In 2NF
- No non-key attributes depend on other non-key attributes

## Creating Tables

```sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_order_date (order_date)
);
```

## Indexes

Speed up data retrieval.

```sql
-- Create index
CREATE INDEX idx_email ON employees(email);

-- Composite index
CREATE INDEX idx_name ON employees(last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_employee_id ON employees(id);
```

## Constraints

Enforce data integrity.

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age >= 18),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ER Diagram Relationships

```
One-to-One:   Customers 1:1 Addresses
One-to-Many:  Departments 1:N Employees
Many-to-Many: Students N:M Courses (via Enrollments)
```

## Design Best Practices

- ✓ Use meaningful column names
- ✓ Choose appropriate data types
- ✓ Add NOT NULL where required
- ✓ Use foreign keys for relationships
- ✓ Index frequently searched columns
- ✓ Normalize data structures
- ✓ Document your schema
- ✗ Avoid storing calculated values
- ✗ Don't mix data types in one column
- ✗ Overuse indexes (slow writes)
