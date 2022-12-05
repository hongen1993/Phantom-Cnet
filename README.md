# ...Phantom CNET...

### The project is executed with:

- [Node.js](https://nodejs.org/es/)
- [express.js](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/es)

## Endpoints Grid

### Auth routes

|  METHOD  | ENDPOINT                                 | RESPONSE        | ACTION                      |
| -------- | -----------------------------------------| ----------------| --------------------------- |
|   GET    | /auth/verify                             |  {authData}     | Verify user                 |
|   POST   | /auth/login                              |  {authToken}    | Check user on db            |
|   POST   | /auth/signup                             |  {user}         | Create user on db           |

### User routes

|  METHOD  | ENDPOINT                                 | RESPONSE        | ACTION                      |
| -------- | -----------------------------------------| ----------------| --------------------------- |
|   PUT    | /user/edit-profile/:id                   |  {user}         | Edit your profile           |
|   PUT    | /user/edit-admin/:id                     |  {user}         | [ADMIN] Edit user           |
|  DELETE  | /user/edit-admin/:id                     |  {user}         | Delete user                 |
|  DELETE  | /user/delete/:id                         |  {user}         | [ADMIN] Delete user         |

### Taskcard routes

|  METHOD  | ENDPOINT                                 | RESPONSE        | ACTION                      |
| -------- | -----------------------------------------| ----------------| --------------------------- |
|   POST   | /taskboard/create-taskcards              |  {card}         | Create task cards           |
|   PUT    | /taskboard/edit-taskcards                |  {card}         | Edit your task cards        |
|  DELETE  | /taskboard/delete-taskcards              |  {taskcard}     | Delete your task cards      |

## Models

### -UserModel-

|          Properties          |                           Type                            |
| ---------------------------- | --------------------------------------------------------- |
|  Email                       |  String, required, unique, lowercase, trim.               |
|  Name                        |  String, required.                                        |
|  Password                    |  String, required.                                        |
|  TaskCard                    |  Title: String, required; Tasks: String.                  |
|  Role                        |  String, trim, enum: Admin, user; Default: User.          |

## Enviroment variables required 

PORT
ORIGIN
TOKEN_SECRET
MONGODB_URI

## Author

### Development made by [Hongen](https://phantom.com)