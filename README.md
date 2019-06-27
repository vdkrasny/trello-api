# Trello API

## Short Description

You need to build REST API which allows you to do simple CRUD operations with role permissions.

## Estimation (h)

32

## Topics

-   Architecture principles
-   Express
    -   Middleware
    -   Routing
    -   Logger
    -   Validation

## Requirements

1. Create CRUD operations for the next entities: [boards](db/boards.json), [cards](db/cards.json). Each json files should contains at least 3 records by default. There are 2 types of users: Admin and simple user. Only admins can create, update and delete boards.

    Board fields:

    - name
    - color
    - description
    - create at

    Card fields:

    - name
    - description
    - create at
    - estimate
    - status(enum)
    - due date
    - labels([string])

2. Use [helmetjs](https://helmetjs.github.io/) for secure reasons.

3. Create minimum 2 custom middleware.

4. Add and configure Logger for development(in console) and production(in file) environments.

5. Use [Joi](https://github.com/hapijs/joi) to validate incoming parameters.

6. Use Three-Tier Architecture.

## Testing

Use [postman](https://www.getpostman.com/) for testing REST API.

## Advanced Requirements

All existing routes should be covered by tests.
