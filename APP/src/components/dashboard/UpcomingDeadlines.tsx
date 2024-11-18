import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

const deadlines = [
  {
    id: 1,
    title: 'Website Redesign',
    client: 'Acme Corp',
    deadline: '2024-02-15',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    client: 'TechStart',
    deadline: '2024-02-20',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Brand Guidelines',
    client: 'Design Co',
    deadline: '2024-02-25',
    priority: 'Low',
  },
];

export function UpcomingDeadlines() {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="space-y-1">
                <p className="font-medium">{deadline.title}</p>
                <p className="text-sm text-muted-foreground">
                  {deadline.client}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(deadline.priority)}>
                  {deadline.priority}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(deadline.deadline), 'MMM dd')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}