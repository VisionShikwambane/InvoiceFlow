import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, FileText, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Clients',
    value: '24',
    change: '+2 from last month',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Monthly Revenue',
    value: '$45,231',
    change: '+20.1% from last month',
    icon: DollarSign,
    trend: 'up',
  },
  {
    title: 'Active Projects',
    value: '12',
    change: '+3 from last month',
    icon: FileText,
    trend: 'up',
  },
  {
    title: 'Growth Rate',
    value: '24.5%',
    change: '+4.5% from last month',
    icon: TrendingUp,
    trend: 'up',
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}