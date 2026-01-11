---
title: "Data Analysis - Sorting, Filtering, and PivotTables"
description: "Analyze large datasets efficiently using Excel's powerful tools"
image: "/img/excel-analysis.png"
type: "article"
resources:
  - name: "Data Analysis Guide PDF"
    link: "https://example.com/data-analysis.pdf"
    type: "pdf"
  - name: "Sample Analysis File"
    link: "https://example.com/sales-analysis.xlsx"
    type: "pdf"
  - name: "PivotTable Tutorial"
    link: "https://youtube.com/watch?v=excel-pivottables"
    type: "video"
---

## Sorting Data

Sort single or multiple columns.

```
Single Sort:
- Select data range
- Data tab → Sort A to Z or Z to A

Multi-level Sort:
- Data tab → Sort (dialog)
- Primary sort: Column 1
- Secondary sort: Column 2
- Tertiary sort: Column 3
```

## AutoFilter

Quickly filter data by column values.

```
Enable AutoFilter:
- Select data range
- Data tab → AutoFilter
- Click dropdown arrows in header row

Filter Options:
- Uncheck values to hide
- Custom Filter for complex conditions
- Date filters for date ranges
- Number filters (>, <, between)
```

## Advanced Filter

Create filtered copies or complex criteria.

```
Steps:
1. Set up criteria range
2. Data tab → Advanced
3. Choose Filter in Place or Copy
4. Specify criteria range
```

## PivotTables

Summarize large datasets instantly.

```
Create PivotTable:
1. Select data range
2. Insert tab → PivotTable
3. Choose location (New/Existing sheet)
4. Drag fields to areas:
   - Rows: What to group by
   - Columns: How to organize
   - Values: What to summarize
   - Filters: Top-level filters

Example - Sales by Region:
- Rows: Region
- Columns: Month
- Values: Sum of Sales
- Creates summary table automatically
```

## Pivot Table Actions

```
Refresh Data:
- PivotTable tab → Refresh

Add Fields:
- Drag additional fields to areas

Change Calculation:
- Right-click value → Value Field Settings
- Choose: Sum, Count, Average, Max, Min, etc.

Filter PivotTable:
- Click filter buttons in pivot
- Or add field to Filters area
```

## Data Tools

```
Subtotals:
- Organize data with hierarchy
- Data tab → Subtotals
- Creates groups you can collapse

Consolidate:
- Combine data from multiple ranges
- Data tab → Consolidate
- Useful for merging reports

Text to Columns:
- Split combined data
- Data tab → Text to Columns
- Choose delimiters: comma, space, tab, other
```

## Practical Analysis Example

```
Sales Data Analysis:
1. Load sales dataset
2. Apply AutoFilter to filter by region
3. Create PivotTable summarizing:
   - Rows: Product Category
   - Columns: Quarter
   - Values: Sum of Sales, Count of Orders
4. Add Profit margin calculation
5. Create visual insights
```

## Data Validation for Clean Analysis

```
Set up validation:
- Select input cells
- Data tab → Data Validation
- Choose criteria (List, Number range, Date)
- Shows error message if invalid

Benefits:
- Prevents data entry errors
- Improves data quality
- Makes analysis more reliable
```

## Best Practices

- ✓ Keep raw data separate
- ✓ Use headers for all data
- ✓ Remove duplicates before analysis
- ✓ Document your assumptions
- ✓ Create backup before major changes
- ✗ Don't sort partial data
- ✗ Don't modify source data in pivot
- ✗ Avoid empty rows/columns
