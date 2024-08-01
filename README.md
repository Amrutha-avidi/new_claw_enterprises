# Todo Application API Documentation 
## Base URL
http://localhost:3005

## Endpoints
## User Registration
URL: /register
Method: POST
Request Body:
  Content-Type: application/json
##  Body:
{
    "username": "exampleUser",
    "password": "examplePassword"
}
## Response:
  Status Code: 201 Created
  Content :{
    "message": "User created"
  }

## User Login
URL: /login
Method: POST
## Request Body:
  Content-Type: application/json
  Body:{
    "username": "exampleUser",
    "password": "examplePassword"
  }
## Response:
  Status Code: 200 OK
  Content:{
    "message": "Login successful",
    "user": {
      "id": 1,
      "username": "exampleUser"
    }
  }
## Cookies:
  Name: token
  Content: JWT token

## Create a Todo
URL: /todo
Method: POST
## Request Body:
  Content-Type: application/json
  Body:{
  "description": "Buy groceries",
  "status": "Pending"
}
## Response:
  Status Code: 201 Created
  Content:{
  "message": "Todo created"
}
## Cookies:
  Name: token
  Content: JWT token (required)

## Get All Todos
URL: /getAllTodos
Method: GET
## Response:
  Status Code: 200 OK
  Content:[
  {
    "id": 1,
    "user_id": 1,
    "description": "Buy groceries",
    "status": "Pending"
  },
  {
    "id": 2,
    "user_id": 1,
    "description": "Clean the house",
    "status": "Completed"
  }
]
## Cookies:
  Name: token
  Content: JWT token (required)

## Delete a Todo
URL: /todo/{id}
Method: DELETE
### URL Parameters:
 id: The ID of the todo to be deleted
# Response:
  Status Code: 200 OK
  Content:{
  "message": "Todo deleted successfully"
}

## Update a Todo
URL: /todo/{id}
Method: PUT
## URL Parameters:
  id: The ID of the todo to be updated
  
## Request Body:
  Content-Type: application/json
  Body:{
  "description": "Buy groceries and cook dinner",
  "status": "Ongoing"
}
## Response:
  Status Code: 200 OK
  Content:{
  "message": "Todo updated successfully"
}
## Cookies:
  Name: token
  Content: JWT token (required)


## Get User Profile
URL: /profile
Method: GET
## Response:
  Status Code: 200 OK
  Content:{
    "id": 1,
    "username": "exampleUser"
  }
## Cookies:
  Name: token
  Content: JWT token (required)

## Get All Users
URL: /users
Method: GET
## Response:
  Status Code: 200 OK
  Content:
  [
  {
      "id": 1,
      "username": "exampleUser"
    },
    {
      "id": 2,
      "username": "anotherUser"
    }
  ]

# Deployment #

Frontend deployment is done in # Netlify and backend Deployment is done on # Render
### Run the client with the command npm start and 
### myapi with the command nodemon app.js

