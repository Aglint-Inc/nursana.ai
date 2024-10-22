# Interview Dashboard: Data Calculations and Chart Generation

This document outlines how to calculate and generate data for the various charts and components in our interview dashboard.

## 1. Interview Completion Funnel

**Data Source:** `interview` table

**Calculation Steps:**

1. Count total interviews
2. Count interviews at each `interview_stage`
3. Calculate percentage for each stage

**Implementation:**

- Use a reducer to count interviews in each stage
- Calculate percentages based on total count
- Order stages: not_started -> resume_submitted -> interview_inprogress -> interview_completed

## 2. Interview and Hire Trends

**Data Sources:** `interview` and `interview_analysis` tables

**Calculation Steps:**

1. Group interviews by month
2. Count total interviews per month
3. Count completed interviews (with analysis) per month
4. If hire data available, include it in the trend

**Implementation:**

- Use `Date` objects to group by month
- Ensure proper date range filtering for relevant trends

## 3. Skill Gap Analysis

**Data Source:** `interview_analysis` table

**Calculation Steps:**

1. Extract skill assessments from `structured_analysis`
2. Calculate average scores for each skill across all interviews
3. Compare with required skill levels (predefined or configurable)

**Implementation:**

- Parse JSON data in `structured_analysis` for skill scores
- Implement a scoring system for skills if not already present
- Consider weighted averages if some assessments are more important

## 4. Location-based Breakdown

**Data Source:** `applicant` table

**Calculation Steps:**

1. Aggregate `preferred_locations` from all applicants
2. Count occurrences of each location
3. Calculate percentage for top locations

**Implementation:**

- Handle array data in `preferred_locations`
- Consider grouping similar locations or using a standardized location format

## 5. Licenses Distribution

**Data Source:** `applicant` table

**Calculation Steps:**

1. Aggregate all licenses from applicants
2. Count occurrences of each license type
3. Calculate percentage for each license type

**Implementation:**

- Ensure consistent license naming or use a predefined list of license types
- Handle cases where applicants have multiple licenses

## 6. Preferred Job Types

**Data Source:** `applicant` table

**Calculation Steps:**

1. Aggregate all job types from `job_type` field
2. Count occurrences of each job type
3. Calculate percentage for each job type

**Implementation:**

- Handle array data in `job_type`
- Consider grouping similar job types for more meaningful analysis

## 7. Top Applicants Leaderboard

**Data Sources:** `applicant`, `interview`, and `interview_analysis` tables

**Calculation Steps:**

1. Join data to get applicant info and interview results
2. Calculate match scores:
   - License match
   - Location match
   - Hospital preference match
   - School match
3. Calculate overall fit score
4. Rank applicants based on overall fit

**Implementation:**

- Define scoring algorithms for each match type
- Implement a weighted scoring system for overall fit
- Optimize for performance, especially with large datasets

## General Implementation Notes

1. **Data Fetching:** Use server-side data fetching for sensitive operations.
2. **Caching:** Implement caching for frequently accessed, slow-changing data.
3. **Real-time Updates:** Consider websockets or server-sent events for live updates.
4. **Performance:** Optimize queries and use pagination for large datasets.
5. **Error Handling:** Implement robust error handling and logging.
6. **Security:** Ensure proper data access controls and input validation.
7. **Scalability:** Design calculations to handle increasing data volumes efficiently.

Remember to adapt these calculations and implementations based on the specific requirements of your application and any constraints in your system architecture.
