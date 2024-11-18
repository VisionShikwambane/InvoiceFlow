import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Active', value: 12, color: 'hsl(var(--primary))' },
  { name: 'Completed', value: 8, color: 'hsl(var(--accent))' },
  { name: 'On Hold', value: 4, color: 'hsl(var(--muted))' },
];

export function ClientOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => {
                  return (
                    <ul className="flex justify-center gap-6">
                      {payload?.map((entry, index) => (
                        <li key={`item-${index}`} className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {entry.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}