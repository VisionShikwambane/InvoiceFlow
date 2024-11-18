import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, MoreVertical, User } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TaskProgressDialog } from './TaskProgressDialog';

interface TaskCardProps {
  task: Task;
  index: number;
  onUpdateProgress: (taskId: string, progressStatus: Task['progressStatus']) => void;
}

export function TaskCard({ task, index, onUpdateProgress }: TaskCardProps) {
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getProgressColor = (status: Task['progressStatus']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'Almost Done':
      case '75% Done':
        return 'bg-blue-500';
      case '50% Done':
        return 'bg-yellow-500';
      case '25% Done':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressValue = (status: Task['progressStatus']) => {
    switch (status) {
      case 'Completed': return 100;
      case 'Almost Done': return 90;
      case '75% Done': return 75;
      case '50% Done': return 50;
      case '25% Done': return 25;
      case 'Started': return 10;
      default: return 0;
    }
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              transform: snapshot.isDragging
                ? provided.draggableProps.style?.transform
                : 'none',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="hover:border-primary/50 transition-colors">
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium line-clamp-2">{task.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="-mr-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setIsProgressDialogOpen(true)}
                          >
                            Update Progress
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{task.progressStatus}</span>
                    </div>
                    <Progress
                      value={getProgressValue(task.progressStatus)}
                      className="h-2"
                      indicatorClassName={getProgressColor(task.progressStatus)}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{task.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
                    </div>
                    {task.startedAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Started {format(new Date(task.startedAt), 'MMM dd')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </Draggable>

      <TaskProgressDialog
        task={task}
        open={isProgressDialogOpen}
        onOpenChange={setIsProgressDialogOpen}
        onUpdateProgress={onUpdateProgress}
      />
    </>
  );
}