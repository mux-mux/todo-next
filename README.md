# ToDo - Your ultimate to do app:fire:

Create and manage todos with ease using this modern full-stack application

## Folder structure :open_file_folder:

The project follows a full-stack structure:

- `backend/` - Express.js
- `frontend/` - React.js + Next.js

## How To Use :closed_lock_with_key:

### 1️⃣ Clone the Repository

Open a terminal or command prompt and run:

```sh
git clone git@github.com:mux-mux/todo-next.git
cd todo-next
```

### 2️⃣ Setup .env file

Inside the `backend` folder, create a file named `.env` with the following content:

```sh
# App Config
PORT=3001
BASE_URL=http://localhost:3001
NODE_ENV=development
```

### 3️⃣ Start Backend

This will set start Express server:

```sh
cd backend
npm install
node server.js
```

### 4️⃣ Start Frontend

This will Open the browser & listen to files changes<br/>
Open another terminal in the project root and run:

```sh
cd frontend
npm install
npm run dev
```

Your app should now be running!<br/>
On: 🔗 http://localhost:3000
