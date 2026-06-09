# 🍵 Matcha Intelligence Tracker

Live Demo: https://matcha-intelligence-tracker-am2t-6f2opyfka.vercel.app/

Matcha Intelligence Tracker adalah aplikasi web full-stack untuk mencatat, mengelola, dan menganalisis pengalaman menikmati matcha. Pengguna dapat memberikan rating, menambahkan catatan rasa, melihat statistik, dan memantau tren penilaian dari waktu ke waktu.

## Features

- Add and manage matcha entries
- Rating system (1–5 stars)
- Personal tasting notes
- Average rating analytics
- Best-rated matcha tracking
- Interactive rating trend chart
- Responsive user interface
- REST API with Next.js Route Handlers

## Tech Stack

- Next.js 16
- React
- TypeScript
- Prisma ORM
- SQLite
- Recharts
- Tailwind CSS
- Vercel

### Dashboard
<img width="506" height="409" alt="Screenshot 2026-06-09 094042" src="https://github.com/user-attachments/assets/3ca2ed2b-0fa5-4479-bf8b-9f1f17f0b943" />

## Project Structure

```text
app/
├── api/
│   └── matcha/
├── page.tsx
├── layout.tsx

prisma/
├── schema.prisma

public/
```

## Installation

Clone repository:

```bash
git clone https://github.com/tasyahutapea/matcha-intelligence-tracker.git
```

Masuk ke folder project:

```bash
cd matcha-intelligence-tracker
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Database

Project ini menggunakan SQLite dan Prisma ORM.

Schema database didefinisikan pada:

```text
prisma/schema.prisma
```

## Future Improvements

- User authentication
- User profile management
- Cloud database integration (PostgreSQL)
- Matcha recommendation engine
- Advanced analytics dashboard
- Export tasting history

## Author

Natasya Hutapea

GitHub:
https://github.com/tasyahutapea

LinkedIn:
https://www.linkedin.com/in/natasya-hutapea-29377b306/

## Repository

https://github.com/tasyahutapea/matcha-intelligence-tracker

## Live Demo

https://matcha-intelligence-tracker-am2t-6f2opyfka.vercel.app/
