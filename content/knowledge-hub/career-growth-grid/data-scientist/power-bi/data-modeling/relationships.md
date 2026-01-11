---
title: "Data Modeling - Relationships and Schema Design"
description: "Create efficient data models with proper relationships and normalization"
image: "/img/powerbi-modeling.png"
type: "article"
resources:
  - name: "Data Modeling Guide PDF"
    link: "https://example.com/powerbi-modeling.pdf"
    type: "pdf"
  - name: "Sample Data Model"
    link: "https://example.com/sample-model.pbix"
    type: "pdf"
---

## Understanding Data Models

A data model organizes your data for efficient analysis.

```
Components:
- Tables: Collections of data
- Columns: Attributes of data
- Relationships: Connections between tables
- Measures: Calculated values
```

## Table Relationships

```
One-to-One:
- One customer → One address
- Less common

One-to-Many:
- One department → Many employees
- Most common
- Parent side (1) → Child side (many)

Many-to-Many:
- Many students → Many courses
- Requires junction table
- More complex but powerful
```

## Creating Relationships

```
Manual Creation:
1. Modeling tab → Manage Relationships
2. Click New
3. Select parent table and column
4. Select child table and column
5. Verify cardinality (1:many)
6. Set cross-filter direction

Auto-Detection:
- Power BI auto-detects matching names
- Review and confirm relationships
- May need adjustments
```

## Relationship Properties

```
Cardinality:
- One to One (1:1)
- One to Many (1:*)
- Many to One (*:1)
- Many to Many (*:*)

Cross Filter Direction:
- Single: Filter flows one direction
- Both: Filter flows both ways
- Use Both carefully (can cause issues)

Assume Referential Integrity:
- Faster queries if all values exist
- Only check if data is clean
```

## Star Schema Design

Optimal structure for business intelligence.

```
Structure:
- Fact Table (center): Contains transactions
- Dimension Tables (surrounding): Contain attributes

Fact Table:
- Keys (ForeignKey IDs)
- Metrics (amounts, quantities)
- Dates

Dimension Tables:
- Keys (primary keys)
- Attributes (names, categories)
- Hierarchies (year→month→day)

Benefits:
- Fast queries
- Intuitive for analysis
- Easy to maintain
```

## Hierarchies

Organize data into logical levels.

```
Create Hierarchy:
1. Right-click column in Fields
2. New Hierarchy
3. Add columns in order
4. Example: Date → Year → Month → Day

Using Hierarchies:
- Drag to visualizations
- Drill down in charts
- Interactive exploration
- Improves user experience
```

## Hidden Tables and Columns

```
Hide from Users:
- Right-click field
- Hide in report view
- Still available for calculations
- Cleaner interface

Use Cases:
- Hide ID columns
- Hide helper calculations
- Simplify field list
- Focus on key metrics
```

## Data Modeling Best Practices

```
Table Organization:
- Separate fact and dimension tables
- One grain per fact table
- Consistent naming conventions
- Document relationships

Column Management:
- Hide technical IDs
- Rename for clarity
- Set appropriate data types
- Format numbers and dates

Performance:
- Remove unnecessary columns
- Denormalize if needed for speed
- Use aggregated tables for large datasets
- Monitor query performance
```

## Common Mistakes

- ✗ Circular relationships
- ✗ Too many many-to-many
- ✗ Bi-directional cross-filtering
- ✗ Missing keys
- ✓ Clear, documented relationships
- ✓ Proper table organization
- ✓ Optimized for both usability and performance

## Troubleshooting Relationships

```
Relationship Issues:
- Unexpected blank rows: Check foreign keys
- Slow performance: Review relationship count
- Wrong calculations: Verify relationship direction
- Missing data: Check cardinality settings

Solutions:
- Use Model View to visualize
- Check data types match
- Verify key column values
- Test with simple visuals first
```
