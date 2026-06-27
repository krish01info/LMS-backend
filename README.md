# LearnFlow LMS — Backend

## Stack
- Node.js + Express
- PostgreSQL (Supabase) + Prisma ORM
- JWT + Google OAuth
- Razorpay (payments)
- Bunny.net (video streaming)
- Supabase Storage (files)
- Nodemailer + Gmail SMTP (emails)

## Setup
```bash
npm install
cp .env.example .env   # fill in your values
npx prisma generate
npx prisma db push     # or migrate dev
npm run dev
```

## API Base URL
`http://localhost:5000/api`

## Coding Order (Step by Step)
1. Auth (register, login, JWT)
2. Google OAuth
3. User management (RBAC, suspend, parent-student link)
4. Domains & Categories
5. Courses (CRUD, publish)
6. Sections & Lessons (Bunny.net + Supabase Storage)
7. Enrollment (free + paid check)
8. Progress Tracking
9. Quiz Module
10. Assignment Module
11. Payment (Razorpay order + verify)
12. Certificate Module
13. Notifications (email)
