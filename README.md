# 🌱 CodeBurry – Learn by Doing, Grow by Creating

**CodeBurry** is an experimental, hands-on learning platform built to replace passive studying with active exploration.  
It combines **interactive challenges**, **gamified progress**, and a **community-driven approach** to make learning practical, visual, and rewarding.  

> ⚠️ **Status:** Early development build  
> 🎨 UI is complete.  
> 🗄️ Database and 🔐 Authentication integration are in progress.

---

## 🚀 Overview

CodeBurry transforms traditional learning into a **growth-based journey** — where every completed challenge helps your skills grow like trees in a forest.  
Currently, the frontend (React + TypeScript) is ready and designed for smooth future integration with backend systems.

---

## 🧩 Core Principles

| 🌟 Principle | 💬 Description |
|---------------|----------------|
| **Active Over Passive** | Learn through solving, building, and experimenting — not just reading. |
| **Growth Mindset** | Each completed challenge plants a seed that grows into lasting knowledge. |
| **Community-Driven** | Learn, share, and grow together with fellow learners. |
| **Curiosity First** | Spark curiosity and exploration through open-ended challenges. |

---

## 💡 Features (UI Stage)

- 🎯 **Interactive Challenges** – Hands-on, real-world learning components  
- 🌳 **Gamified Progress** – Earn “water drops” and grow your digital forest  
- 🤝 **Community Garden** – Share progress and celebrate learning together  
- 📈 **Personalized Growth** – Track progress visually and unlock milestones  

---

## ⚙️ Tech Stack

| Area | Technologies |
|------|---------------|
| **Frontend** | React, TypeScript, TailwindCSS |
| **UI Components** | Lucide React, shadcn/ui |
| **Markup** | HTML, TSX |
| **Config/Data** | JSON |
| **Backend (Planned)** | Node.js / Express |
| **Database (Planned)** | Firebase / Supabase |

---

## 🧭 Current Development Status

| Component | Progress |
|------------|-----------|
| 🎨 UI / Frontend | ✅ Completed |
| 🗄️ Database Integration | 🔧 In Progress |
| 🔐 Authentication | 🚧 Work in Progress |
| 🧠 Challenge Engine | 🧩 Design Stage |
| 🌍 Deployment | ⏳ Planned |

---

## 📅 Roadmap

- [ ] Implement Firebase/Supabase authentication  
- [ ] Connect database to store user progress  
- [ ] Launch the first functional prototype  
- [ ] Add interactive coding challenges  
- [ ] Open community contribution phase  

---

## 💬 Vision

> “Building the roots before the forest.”  
CodeBurry’s goal is to make learning **active, visual, and rewarding** — helping learners grow one challenge at a time.

---

## 🛠 Setup (For Developers)

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager

### Installation & Running

#### 1. **Clone the Repository**
```bash
git clone https://github.com/sidoxsinu/codeburry.git
cd codeburry
```

#### 2. **Install Dependencies**
```bash
npm install
```

#### 3. **Run Development Server**
The application runs both frontend and backend concurrently:

```bash
npm run dev
```

This command will:
- ✅ Start the **Vite frontend** on `http://localhost:5173`
- ✅ Start the **Express backend** on `http://localhost:4000`

#### 4. **Build for Production**
```bash
npm run build
```

Builds the React app to the `dist` folder for deployment.

#### 5. **Run Linting**
```bash
npm lint
```

Checks code quality with ESLint.

### 🔧 Development Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Run frontend + backend concurrently |
| `npm run dev:client` | Run only Vite frontend on `:5173` |
| `npm run dev:server` | Run only Express backend on `:4000` |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm lint` | Run ESLint checks |

---

## 📁 Project Structure

```
codeburry/
├── src/                    # React frontend (TypeScript)
│   ├── components/        # UI components
│   ├── pages/            # Page components
│   ├── context/          # React context (Auth, User)
│   ├── types/            # TypeScript interfaces
│   └── App.tsx           # Main app component
├── server/               # Express backend
│   ├── server.js         # Server entry point
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB models
│   └── routes/           # API routes
├── public/               # Static assets
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies & scripts
```

---

## 🌐 Features Overview

**CodeBurry** is a full-stack React + Vite + Express + MongoDB app with gamified learning:
- 🎯 **Learning Hub** – Start challenges and upload task files
- 🌳 **Virtual Garden** – Watch your skills grow as trees
- 🏆 **Leaderboard** – Compete with other learners
- 💬 **Community** – Share achievements and learning journeys
- 📊 **Dashboard** – Track personal progress and stats
- 🎮 **Gamification** – Earn water drops and unlock milestones
- Admin Panel for verifying submissions and awarding water drops
- Leaderboard powered by database stats (drops, lessons, streak)
- Dashboard and Garden showing user progress (DB-backed)

Tech Stack
---------
- Frontend: React 18, Vite, TypeScript, TailwindCSS
- Backend: Node.js, Express, Mongoose, Socket.io
- Auth: Signed HTTP-only cookies (JWT)
- File uploads: multer to local `uploads/`
- DB: MongoDB (Atlas or local)

Prerequisites
-------------
- Node.js 18+
- MongoDB connection string

Getting Started
---------------
1) Install dependencies

```bash
npm install
```

2) Configure environment
- The server uses `process.env.JWT_SECRET` (falls back to a dev default).
- Mongo URI is currently configured directly in `server/server.js`. Replace with your own if needed.

3) Run dev servers (concurrently runs client and API)

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:4000

Vite proxy forwards `/api/*` to the API.

Core Features and Flows
-----------------------

Authentication
--------------
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login`
- Logout: `POST /api/auth/logout`
- Session: `GET /api/auth/me`

Leaderboard (DB-backed)
-----------------------
- Model: `LeaderboardStat` (per user)
  - fields: `userId`, `name`, `drops`, `lessonsCompleted`, `streak`
- API: `GET /api/leaderboard?by=drops|lessons|streak&limit=50`
- User stats: `GET /api/me/leaderboard`, `POST /api/me/leaderboard` (increment user’s stats)
- Frontend page: `src/pages/Leaderboard.tsx` (fetches from API)

Learning Hub – Start & Upload
-----------------------------
- Start sets UI state to “Started”
- Upload uses multipart to send files:
  - `POST /api/challenges/:id/upload` (field: `file`, body: `challengeTitle`)
  - Files are stored in `uploads/` and served at `/uploads/<filename>`
- Flash message “Task uploaded” shown on success
- Existing submissions are loaded on mount via `GET /api/me/submissions` to persist UI state

Admin Panel – Review & Award Drops
----------------------------------
- List submissions by status: `GET /api/admin/submissions?status=submitted|approved|rejected`
- Verify: `POST /api/admin/submissions/:id/verify` with `{ approve: boolean, dropsAward: number }`
  - On approval, increments `LeaderboardStat.drops` for that user
  - “Open file” link available if a file was uploaded
- Admin endpoints require auth + role `admin`

Dashboard & Garden (User Stats)
-------------------------------
- `UserContext` loads user’s stats from `/api/me/leaderboard` and refreshes on window focus + every 15s
- Dashboard and Garden read from `useUser().stats`
- Garden classic UI adapter: `src/pages/GardenClassic.tsx` (renders old UI using DB-backed stats)

Project Structure (key paths)
-----------------------------
- `server/server.js` – Express server, schemas, routes
- `src/context/AuthContext.tsx` – auth state
- `src/context/UserContext.tsx` – DB-backed user stats and helpers
- `src/pages/Leaderboard.tsx` – leaderboard page
- `src/components/LearningHub.tsx` – challenges and upload flow
- `src/pages/AdminPanel.tsx` – submission moderation and awarding
- `src/pages/GardenClassic.tsx` – adapter for classic Garden UI
- `uploads/` – uploaded files (served at `/uploads`)

Common Tasks
------------
- Seed demo leaderboard data (automatic on first run): Included in server start.
- Make a user admin: Register user with email starting `admin@` or update role in DB.
- Change Mongo URI: Edit `mongoUri` in `server/server.js`.

Notes & Limitations
-------------------
- File storage is local for development; switch to cloud storage for production.
- JWT secret should be provided via environment in production.
- If drops don’t appear immediately after admin approval, wait up to 15s or refocus window; or wire a manual refresh using `useUser().refreshStats()`.

Scripts
-------
```bash
npm run dev        # client + server concurrently
npm run build      # build frontend
npm run preview    # preview built frontend
```


>>>>>>> 4ec178f (Final Commit)
