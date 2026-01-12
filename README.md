# FitnessPoint

A comprehensive fitness awareness website with social features, calorie calculator, and personalized fitness tips and exercises.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Social Feed**: Post, like, and comment on fitness journeys to encourage each other
- **Calorie Calculator**: Calculate your daily calorie needs and macronutrient targets based on your goals
- **Fitness Tips & Exercises**: Get personalized fitness advice and exercise recommendations
- **User Profiles**: Manage your personal information and fitness goals

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- SQLite database
- JWT authentication
- bcrypt for password hashing

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Heroicons for icons

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install all dependencies (root, server, and client):
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm run dev
```

This will start both the backend server (port 5000) and the frontend development server (port 3000).

### Manual Setup (Alternative)

If you prefer to set up manually:

1. Install root dependencies:
```bash
npm install
```

2. Install server dependencies:
```bash
cd server
npm install
cd ..
```

3. Install client dependencies:
```bash
cd client
npm install
cd ..
```

4. Start the backend server:
```bash
cd server
npm run dev
```

5. In a new terminal, start the frontend:
```bash
cd client
npm start
```

## Environment Variables

Create a `.env` file in the `server` directory:

```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
```

## Project Structure

```
FitnessPoint/
├── server/                 # Backend code
│   ├── src/
│   │   ├── index.ts       # Server entry point
│   │   ├── database.ts    # Database initialization
│   │   ├── middleware/    # Auth middleware
│   │   └── routes/        # API routes
│   └── package.json
├── client/                 # Frontend code
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── App.tsx        # Main app component
│   └── package.json
└── package.json           # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users/:id` - Get user by ID
- `POST /api/users/:id/follow` - Follow a user
- `DELETE /api/users/:id/follow` - Unfollow a user

### Posts
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create a new post
- `POST /api/posts/:id/like` - Like/unlike a post
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add a comment to a post

### Calories
- `POST /api/calories/calculate` - Calculate calorie needs

### Fitness
- `GET /api/fitness/tips?goal=lose|maintain|gain` - Get fitness tips
- `GET /api/fitness/exercises?goal=lose|maintain|gain` - Get exercises

## Database Schema

The application uses SQLite with the following tables:
- `users` - User accounts and profiles
- `posts` - Social media posts
- `comments` - Comments on posts
- `likes` - Likes on posts
- `follows` - User follow relationships

## DevOps & CI/CD

This project includes comprehensive CI/CD pipelines and Agile development practices.

### Continuous Integration (CI)

The CI pipeline automatically runs on:
- Every push to `main` or `develop` branches
- Every pull request to `main` or `develop` branches

**CI Pipeline Includes:**
- Client linting and type checking
- Server type checking
- Build verification for both client and server
- Security audit
- Integration tests (when available)

**View CI Status:**
- Go to the "Actions" tab in GitHub to see pipeline runs and status

### Continuous Deployment (CD)

The CD pipeline automatically deploys:
- **Staging:** On every push to `main` branch
- **Production:** On version tags (e.g., `v1.0.0`) or manual trigger

**Configure Deployment:**
1. Set up deployment secrets in GitHub repository settings
2. Configure environment variables in GitHub Environments
3. Update deployment steps in `.github/workflows/cd.yml` with your deployment method

For detailed CI/CD documentation, see [docs/CI_CD_GUIDE.md](docs/CI_CD_GUIDE.md)

### Agile Development

This project follows Agile/Scrum methodology:

- **Sprint Duration:** 2 weeks
- **Sprint Ceremonies:** Planning, Daily Standups, Review, Retrospective
- **User Stories:** Tracked using GitHub Issues
- **Project Board:** Use GitHub Projects for sprint management

**Agile Resources:**
- Issue Templates: Bug reports, feature requests, user stories
- Pull Request Template: Standardized PR format
- Documentation: See [docs/AGILE_GUIDE.md](docs/AGILE_GUIDE.md)

## Development Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run install-all` - Install dependencies for root, server, and client

### Client
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests in interactive mode
- `npm run test:ci` - Run tests with coverage (for CI)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Type check without building

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run type-check` - Type check without building

## License

MIT
