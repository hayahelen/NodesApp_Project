# NodesApp

NodesApp is a dynamic and interactive application designed to create, manage, and visualize nodes in a graph using **React Flow**. It provides an intuitive interface for users to add, edit, and link nodes seamlessly. The app supports two primary node types: **User Nodes** and **Habit Nodes**, and is built with modern web technologies for a robust and scalable experience.

## Features

- **Interactive Graph Management**: Create and manage nodes in an interactive graph using React Flow.
- **Node Types**:
  - **User Node**: Allows text input for usernames and is designed to eventually support up to 20 fields.
  - **Habit Node**: Features a dropdown for selecting predefined habits (e.g., Reading, Exercise).
- **Intuitive Interface**:
  - Add nodes via a side panel.
  - Edit nodes by clicking on them.
  - Automatically link nodes in sequence.
- **Workflow Validation**: Robust validation for workflows and forms using **Zod**.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, React Flow, shadcn, and TailwindCSS.
- **Backend**: Prisma for database management.
- **State Management**: TanStack Query for efficient data fetching and caching.
- **Validation**: Zod for workflow and form validation.

##Environment Variables
To run this project, you need to set up the following environment variables in a `.env.local` file:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

You can obtain these keys by creating a project in the Clerk Dashboard. `https://dashboard.clerk.com`
