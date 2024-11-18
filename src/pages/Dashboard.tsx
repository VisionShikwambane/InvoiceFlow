import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ClientOverview } from '@/components/dashboard/ClientOverview';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>Download Report</Button>
        </div>
      </div>

      <motion.div variants={item}>
        <DashboardStats />
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <RevenueChart />
            </div>
            <div className="lg:col-span-3">
              <ClientOverview />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <UpcomingDeadlines />
            <RecentActivity />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}