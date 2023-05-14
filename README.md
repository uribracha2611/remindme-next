# RemindMe

RemindMe is a web-based reminder application built with Next.js, Next-Auth, Prisma, and TypeScript. This application allows users to create, manage, and track reminders, with features such as authentication, calendar mode, and cases mode.

The application is live and can be accessed at: https://remindme-next.vercel.app/

## Features

RemindMe includes the following features:

- Authentication: users can create an account, log in, and log out.
- Reminder Management: users can create, view, update, and delete reminders.
- Calendar Mode: users can view all of their reminders for a chosen day in a calendar view.
- Cases Mode: users can view their reminders filtered by case, making it easier to find specific reminders.

## Getting Started

To run RemindMe locally, please follow these steps:

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Create a `.env.local` file based on the `.env.example` file and update the variables as needed.
4. Set up the database by running `npx prisma migrate dev`.
5. Start the development server by running `npm run dev`.
6. Open [http://localhost:3000](http://localhost:3000) in your web browser to access the application.

## Technologies Used

RemindMe is built with the following technologies:

- Next.js: a React framework for building server-side rendered applications.
- Next-Auth: an authentication library for Next.js applications.
- Prisma: a database toolkit for building type-safe and scalable databases.
- TypeScript: a superset of JavaScript that adds static typing to the language.
