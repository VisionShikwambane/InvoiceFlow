import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { format } from 'date-fns';

const activities = [
  {
    id: 1,
    type: 'invoice_paid',
    description: 'Invoice #1234 paid by Acme Corp',
    timestamp: '2024-02-10T10:00:00Z',
  },
  {
    id: 2,
    type: 'new_client',
    description: 'New client TechStart added',
    timestamp: '2024-02-09T15:30:00Z',
  },
  {
    id: 3,
    type: 'project_completed',
    description: 'Website redesign project completed',
    timestamp: '2024-02-08T09:15:00Z',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 rounded-lg border p-3"
            >
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(activity.timestamp), 'MMM dd, h:mm a')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}