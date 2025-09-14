## Snapshots:

#1. Department wise grouped number of employee data
![image](https://github.com/Samundar9525/emp-prototype-UI/assets/71628177/120701c3-ca0e-4655-b4cb-7fb7a869d6ec)

#2. List of employee in one department 
![image](https://github.com/Samundar9525/emp-prototype-UI/assets/71628177/38e7d812-990d-4e68-ba2f-e1086bea227b)

#3 Single employee records with the timeline and hike data
![image](https://github.com/Samundar9525/emp-prototype-UI/assets/71628177/fd725f1e-9112-4d7c-8b31-a8b055985cce)

#4 CRUD dialogs
<table>
  <tr>
   <td> Adding employee</td>
   <td>Code snippet</td>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/fd3e882e-f2d1-4cd7-a001-753ac60c7a8e" width=570 height=280></td>
    <td><img src="https://github.com/user-attachments/assets/9243e201-45dc-45ee-a894-bcb88363f062" width=570 height=280></td>
  </tr>
 </table>

<table>
  <td> Updating employee</td>
   <td>Code snippet</td>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/4e89699d-32e4-42d4-bd36-1d0dae0a3215" width=570 height=280></td>
    <td><img src="https://github.com/user-attachments/assets/ec1dbc35-15ff-41bd-88ee-02e0b1e751af" width=570 height=280></td>
  </tr>
 </table>
# Project Flow Analysis

## Overview
This is a full-stack Employee Management System built with Django REST Framework (backend) and Angular (frontend), containerized using Docker. The system manages employee data, departments, salaries, and provides comprehensive dashboards for HR management.

## Architecture Flow

### 1. **Infrastructure Layer (Docker + PostgreSQL)**
- **What we do**: Containerize the entire application stack using Docker Compose
- **How we achieve it**:
  - PostgreSQL database container for data persistence
  - Django backend container with Gunicorn for production-ready serving
  - Angular frontend container with Nginx for static file serving
  - Nginx reverse proxy for routing API calls and serving frontend
- **Why**: Ensures consistent deployment across environments and easy scaling

### 2. **Database Layer (PostgreSQL + Django ORM)**
- **What we do**: Store and manage employee, department, salary, and title data
- **How we achieve it**:
  - Custom Django models mapping to PostgreSQL tables
  - Database views for complex queries (employee_department_view, department_employee_counts)
  - Raw SQL queries for performance-critical operations (salary hikes, designation timeline)
  - Management commands to load sample data from SQL files
- **Key Models**:
  - `Employee`: Core employee information
  - `Department`: Department structure
  - `Salary`: Salary history with effective dates
  - `Title`: Job title progression
  - `DeptEmp`: Employee-department relationships

### 3. **Backend API Layer (Django REST Framework)**
- **What we do**: Provide RESTful APIs for frontend consumption
- **How we achieve it**:
  - Django REST Framework for API development
  - Custom serializers for data transformation
  - JWT authentication for secure API access
  - CORS headers for cross-origin requests
  - Custom middleware for authentication handling

#### API Endpoints:
- `/api/dept-dashboard`: Department employee counts
- `/api/employees/<dept_no>/`: Employees by department
- `/api/employees-detail/<emp_no>/`: Detailed employee information
- `/api/salary-hikes/<emp_no>`: Salary progression analysis
- `/api/designation-timeline/<emp_no>/`: Career progression timeline
- `/api/create-employee/`: Add new employees
- `/api/login/`: Authentication endpoints

### 4. **Authentication & Security Layer**
- **What we do**: Secure user access and API protection
- **How we achieve it**:
  - Custom User model with email-based authentication
  - JWT tokens for stateless authentication
  - Session-based authentication for Django admin
  - CORS configuration for frontend-backend communication
  - CSRF protection for form submissions

### 5. **Frontend Layer (Angular)**
- **What we do**: Provide interactive user interface for employee management
- **How we achieve it**:
  - Angular components for different views (dashboard, employee details)
  - HTTP client for API communication
  - Routing for navigation between views
  - Services for data management and API calls
  - Responsive design with Angular Material

#### Key Components:
- `DepartmentDashboardComponent`: Shows department-wise employee counts
- `EmployeeDashboardComponent`: Lists employees in selected department
- `EmployeeDetailComponent`: Detailed employee information with charts

### 6. **Data Processing & Analytics Layer**
- **What we do**: Process and analyze employee data for insights
- **How we achieve it**:
  - Database views for aggregated data
  - Complex SQL queries for salary hike calculations
  - Timeline generation for career progression
  - Experience calculation based on hire dates
  - Department-wise employee grouping

## Data Flow

### User Journey:
1. **Authentication**: User logs in via Django login page → JWT token generated → Redirected to Angular app
2. **Dashboard View**: Angular loads department dashboard → API call to `/api/dept-dashboard` → PostgreSQL query on department_employee_counts view
3. **Department Selection**: User clicks department → Navigate to employee list → API call to `/api/employees/<dept_no>/`
4. **Employee Details**: User selects employee → API calls for detailed info, salary history, designation timeline
5. **CRUD Operations**: Admin can create/update/delete employees via API endpoints

### API Request Flow:
```
Frontend (Angular) → Nginx Proxy → Django Backend → PostgreSQL Database → Response back through the chain
```

## Docker Setup

This backend is containerized using Docker and can be run as part of the full-stack application using Docker Compose.
