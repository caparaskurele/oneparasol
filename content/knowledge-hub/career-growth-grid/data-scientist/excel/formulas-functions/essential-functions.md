---
title: "Excel Formulas - Essential Functions for Data Analysis"
description: "Learn SUM, AVERAGE, IF, VLOOKUP, and other critical Excel functions"
image: "/img/excel-formulas.png"
type: "article"
resources:
  - name: "Excel Formulas Cheat Sheet"
    link: "https://example.com/excel-formulas.pdf"
    type: "pdf"
  - name: "Formula Practice File"
    link: "https://example.com/formula-examples.xlsx"
    type: "pdf"
  - name: "Functions Tutorial"
    link: "https://youtube.com/watch?v=excel-functions"
    type: "video"
---

## Basic Math Functions

```
=SUM(A1:A10)          Total of range
=AVERAGE(A1:A10)      Average of range
=MIN(A1:A10)          Minimum value
=MAX(A1:A10)          Maximum value
=COUNT(A1:A10)        Count numbers
=COUNTA(A1:A10)       Count non-empty cells
```

## IF Function

The most powerful conditional function.

```excel
=IF(condition, value_if_true, value_if_false)

Examples:
=IF(A1>100, "Pass", "Fail")
=IF(A1="", "Missing", A1)
=IF(AND(A1>50, A1<100), "Medium", "Other")

Nested IF:
=IF(A1>90, "A", IF(A1>80, "B", IF(A1>70, "C", "F")))
```

## VLOOKUP and HLOOKUP

Look up values in tables.

```excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])

Example:
=VLOOKUP(E1, A1:B10, 2, FALSE)
- Looks for value in E1
- Searches in range A1:B10
- Returns value from 2nd column
- FALSE = exact match

HLOOKUP:
=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])
```

## TEXT Functions

Manipulate text data.

```excel
=CONCATENATE(A1, " ", B1)    Combine text
=A1 & " " & B1                 Shorthand combine
=UPPER(A1)                     Convert to uppercase
=LOWER(A1)                     Convert to lowercase
=PROPER(A1)                    Capitalize first letter
=LEN(A1)                       Length of text
=LEFT(A1, 3)                   First 3 characters
=RIGHT(A1, 3)                  Last 3 characters
=MID(A1, 2, 4)                 Middle 4 characters starting at 2
=TRIM(A1)                      Remove extra spaces
=SUBSTITUTE(A1, "old", "new")  Replace text
=FIND("text", A1)              Find position
```

## DATE Functions

Work with dates.

```excel
=TODAY()                       Current date
=NOW()                         Current date and time
=YEAR(A1)                      Extract year
=MONTH(A1)                     Extract month
=DAY(A1)                       Extract day
=DATEDIF(A1, B1, "D")         Days between dates
=DATE(2025, 1, 15)            Create specific date
=EDATE(A1, 1)                 Add months to date
```

## Logical Functions

Combine multiple conditions.

```excel
=AND(A1>50, B1<100)           All conditions true?
=OR(A1=1, A1=2)               Any condition true?
=NOT(A1=0)                    Opposite of condition
```

## SUMIF and COUNTIF

Sum/Count with conditions.

```excel
=SUMIF(A1:A10, ">100")        Sum if > 100
=SUMIF(A1:A10, "IT", B1:B10)  Sum B values where A = "IT"
=SUMIFS(B:B, A:A, "IT", C:C, 2025)  Multiple criteria

=COUNTIF(A1:A10, "Yes")       Count "Yes" values
=COUNTIFS(A:A, "IT", C:C, ">50000")  Multiple criteria
```

## INDEX and MATCH

Advanced lookup (better than VLOOKUP).

```excel
=INDEX(return_array, MATCH(lookup_value, lookup_array, 0))

Example:
=INDEX(B1:B10, MATCH(E1, A1:A10, 0))
- Finds E1 value in A1:A10
- Returns corresponding value from B1:B10
- More flexible than VLOOKUP
```

## Array Formulas (Advanced)

Perform operations on arrays.

```excel
=SUM(IF(A1:A10>50, A1:A10, 0))    Sum conditional array
- Enter with Ctrl+Shift+Enter
- Creates array formula
```

## Tips for Better Formulas

- ✓ Use named ranges for clarity
- ✓ Start with = sign
- ✓ Use $ for absolute references
- ✓ Break complex formulas into steps
- ✓ Use error handling: =IFERROR(formula, "")
- ✗ Avoid hardcoding values
- ✗ Don't mix relative and absolute without purpose
