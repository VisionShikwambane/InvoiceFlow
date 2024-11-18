import { Card } from '@/components/ui/card';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';
import { DroppableProvided } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  provided: DroppableProvided;
  onUpdateProgress: (taskId: string, progressStatus: Task['progressStatus']) => void;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function TaskColumn({ title, tasks, provided, onUpdateProgress }: TaskColumnProps) {
  return (
    <motion.div
      variants={item}
      className="flex flex-col rounded-lg border bg-muted/10 p-4"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            onUpdateProgress={onUpdateProgress}
          />
        ))}
        {provided.placeholder}
      </div>
      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex h-24 items-center justify-center rounded-lg border border-dashed"
        >
          <p className="text-sm text-muted-foreground">Drop tasks here</p>
        </motion.div>
      )}
    </motion.div>
  );
}