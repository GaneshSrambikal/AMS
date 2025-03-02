## AMS (Attendance Management System)

#### Attendance Management System to track Attendance of employees.

## Tech Stack

**Client:** Reactjs

**Server:** Node, Express, Socket

**DB:** MongoDb

**Deployment:** Vercel

## Authors

- [@GaneshSrambikal](https://github.com/GaneshSrambikal)

## About

AMS is an platform that let's track your employees attendances. Admin only access to view/edit/delete attendances and employees.
Also able to export records into pdf and csv formats.

Employees can login and check-in/check-out there attendances.

## Packages Used

**Frontend:**

| Packages         | npm links                                      |
| ---------------- | ---------------------------------------------- |
| axios            | https://www.npmjs.com/package/axios            |
| jwt-decode       | https://www.npmjs.com/package/jwt-decode       |
| react-icons      | https://www.npmjs.com/package/react-icons      |
| react-router-dom | https://www.npmjs.com/package/react-router-dom |

**Backend:**
|Packages | npm links |
|---------|-----------|
|express|https://www.npmjs.com/package/express|
|mongodb|https://www.npmjs.com/package/mongodb|
|mongoose|https://www.npmjs.com/package/mongoose|
|jsonwebtoken|https://www.npmjs.com/package/jsonwebtoken|
|bcryptjs|https://www.npmjs.com/package/bcryptjs|

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

_for backend_

```code
DB_URI=
PORT=5000
JWT_SECRET='your_jwt_secret'
```

_for frontend_

```code
VITE_API_BASE_URL=


```

## Installation

#### Clone / fork the repo

```bash
  git clone https://github.com/GaneshSrambikal/AMS.git
```

#### Frontend (cd frontend)

```bash
  npm install
```

#### Note: If dependencies error occurs (As project started with v19. then later downgraded to v18).

```bash
 npm install --legacy-peer-deps
```

#### Backend (cd backend)

```bash
  npm install
```

## Run Locally

Start the server

```bash
  npm run dev
```

Start the client

```bash
npm run dev
```
