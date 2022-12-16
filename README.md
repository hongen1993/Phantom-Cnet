# ...Phantom CNET...

### The project is executed with:

- [Node.js](https://nodejs.org/es/)
- [express.js](https://expressjs.com/es/)
- [MongoDB](https://www.mongodb.com/es)

## Endpoints Grid

### Auth routes

|  METHOD  | ENDPOINT                                 | RESPONSE                                 | ACTION                      |
| -------- | -----------------------------------------| -----------------------------------------| --------------------------- |
|   GET    | /auth/verify                             |  {authData}                              | Verify user                 |
|   POST   | /auth/login                              |  {authToken}                             | Check user on db            |
|   POST   | /auth/signup                             |  {user}                                  | Create user on db           |
                         
### User routes                         
                         
|  METHOD  | ENDPOINT                                 | RESPONSE                                 | ACTION                      |
| -------- | -----------------------------------------| -----------------------------------------| --------------------------- |
|   GET    | /user/all                                |  {users}                                 | [ADMIN]Get all users        |
|   GET    | /user/:id                                |  {user}                                  | [ADMIN]Get one user         |
|   GET    | /user/profile/:id                        |  {user}                                  | Get user profile data       |
|   PUT    | /user/editProfile/:id                    |  {user}                                  | Edit your profile           |
|   PUT    | /user/edit-admin/:id                     |  {user}                                  | [ADMIN] Edit user           |
|  DELETE  | /user/:id                                |  message: 'User deleted succesfully'     | Delete user                 |
                         
### Taskcard routes                         
                         
|  METHOD  | ENDPOINT                                 | RESPONSE                                 | ACTION                      |
| -------- | -----------------------------------------| -----------------------------------------| --------------------------- |
|   GET    | /user/project/:id                        |  {project}                               | Get project data            |
|   POST   | /user/project/newProject                 |  {project}                               | Create project              |
|   PUT    | /user/project/editProject/:id            |  {project}                               | Get project data            |
|  DELETE  | /user/project/:id                        |  message: 'Project deleted succesfully'  | Delete your task cards      |

## Models

### -UserModel-

|          Properties          |                           Type                            |
| ---------------------------- | --------------------------------------------------------- |
|  Email                       |  String, required, unique, lowercase, trim, maxLength:30. |
|  Name                        |  String, required.                                        |
|  Surname                     |  String, required.                                        |
|  Password                    |  String, required, minLength:6.                           |
|  Image                       |  String, required.                                        |
|  Role                        |  String, trim, enum: Admin, user; Default: User.          |
|  Timestamps                  |  True.                                                    |


### -ProjectModel-

|          Properties          |                           Type                            |
| ---------------------------- | --------------------------------------------------------- |
|  Title                       |  String, required, trim, maxLength:30                     |
|  To do                       |  Array of strings, default:'Insert task'.                 |
|  In process                  |  Array of strings.                                        |
|  Done                        |  Array of strings.                                        |
|  User                        |  Type:Schema types objectId, ref: 'User.                  |
|  Timestamps                  |  True.                                                    |

## Enviroment variables required 

PORT
ORIGIN
TOKEN_SECRET
MONGODB_URI

## Author

### Development made by [Hongen Shyu Barcel](phantom-cnet.vercel.app)