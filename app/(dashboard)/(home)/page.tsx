import { Suspense } from 'react';
import Link from 'next/link';
import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, InboxIcon } from 'lucide-react';

function HomePage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="text-muted-foreground">Welcome to NodesApp!</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="h-full py-20">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              NodesApp is a dynamic application built for creating and managing interactive graph nodes using React Flow. 
              It provides a seamless experience for adding, editing, and linking nodes through an intuitive interface.
            </p>

            {/* Node Types Description */}
            <p className="text-muted-foreground text-md mt-4">
              The app supports two primary node types:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <strong>User Node:</strong> Allows text input for usernames and is designed to eventually support up to 20 fields.
              </li>
              <li>
                <strong>Habit Node:</strong> Features a dropdown for selecting predefined habits (e.g., Reading, Exercise).
              </li>
            </ul>

            {/* Key Features */}
            <p className="text-muted-foreground text-md mt-4">
              Key features include:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Adding nodes via a side panel.</li>
              <li>Editing nodes by clicking on them.</li>
              <li>Automatically linking nodes in sequence.</li>
            </ul>

            {/* Tech Stack */}
            <p className="text-muted-foreground text-md mt-4">
              Built with modern web technologies, including:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li><strong>Frontend:</strong> Next.js, React, TypeScript, React Flow, shadcn, and TailwindCSS.</li>
              <li><strong>Backend:</strong> Prisma for database management.</li>
              <li><strong>State Management:</strong> TanStack Query for efficient data fetching and caching.</li>
              <li><strong>Validation:</strong> Zod for robust workflow and form validation.</li>
            </ul>
          </div>

          {/* Call-to-Action Button */}
          <Link href="/workflows">
            <Button variant="default" size="lg">
              Go to Workflows
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;