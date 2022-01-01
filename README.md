# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Data Structures

### Task:
id	DB ID - incremental numeral
taskId	X.X.X (string - ordered)
desc	string
actionBy	string
startDate	string
targetDate	string
percComplete	number
status	string
remarks	string
tasklist	string array of taskId
priority (Low-1, Medium-2, High-3) - High = Milestone	

### Collection
id - incremental number
collection - name for collection
collId X.X.X
tasklist = string array of taskId

### Project
id - incremental number
name - string
collectionlist = string array of collection ids 
(every new project gets a main task collection by default)

### Workflow
id
workflow

