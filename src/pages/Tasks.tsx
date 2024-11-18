import { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/ui/back-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskColumn } from '@/components/tasks/TaskColumn';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Task } from '@/types';
import { useToast } from '@/hooks/use-toast';

const pageAnimations = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const columns = [
  { id: 'todo', title: 'To Do', status: 'To Do' },
  { id: 'inProgress', title: 'In Progress', status: 'In Progress' },
  { id: 'completed', title: 'Completed', status: 'Completed' },
] as const;

export function Tasks() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const { toast } = useToast();

  // Mock data - replace with actual data fetching
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design Homepage',
      description: 'Create a modern homepage design',
      clientId: '1',
      clientName: 'John Smith',
      priority: 'High',
      status: 'In Progress',
      progress: 50,
      progressStatus: '50% Done',
      dueDate: '2024-02-28',
      createdAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate payment gateway API',
      clientId: '2',
      clientName: 'Jane Doe',
      priority: 'Medium',
      status: 'To Do',
      progress: 0,
      progressStatus: 'Not Started',
      dueDate: '2024-03-05',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [clients] = useState([
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Jane Doe' },
  ]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    
    const newStatus = columns.find(
      (col) => col.id === result.destination?.droppableId
    )?.status;
    
    if (newStatus) {
      reorderedItem.status = newStatus;
      
      // Update progress status based on column
      if (newStatus === 'Completed' && reorderedItem.progressStatus !== 'Completed') {
        reorderedItem.progressStatus = 'Completed';
        reorderedItem.completedAt = new Date().toISOString();
      } else if (newStatus === 'In Progress' && reorderedItem.progressStatus === 'Not Started') {
        reorderedItem.progressStatus = 'Started';
        reorderedItem.startedAt = new Date().toISOString();
      }
    }

    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);

    toast({
      title: 'Task Updated',
      description: `${reorderedItem.title} moved to ${newStatus}`,
    });
  };

  const handleUpdateProgress = (taskId: string, progressStatus: Task['progressStatus']) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updates: Partial<Task> = { progressStatus };
        
        // Update related fields based on progress
        if (progressStatus === 'Started' && !task.startedAt) {
          updates.startedAt = new Date().toISOString();
          updates.status = 'In Progress';
        } else if (progressStatus === 'Completed') {
          updates.completedAt = new Date().toISOString();
          updates.status = 'Completed';
        }
        
        return { ...task, ...updates };
      }
      return task;
    }));

    toast({
      title: 'Progress Updated',
      description: `Task progress set to ${progressStatus}`,
    });
  };

  const handleSubmit = (data: Omit<Task, 'id' | 'createdAt' | 'progress' | 'progressStatus'>) => {
    if (selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id 
          ? { ...task, ...data }
          : task
      ));
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        progress: 0,
        progressStatus: 'Not Started',
        ...data,
      };
      setTasks([...tasks, newTask]);
    }
    
    setIsFormOpen(false);
    setSelectedTask(undefined);
    toast({
      title: 'Success',
      description: selectedTask
        ? 'Task updated successfully'
        : 'Task created successfully',
    });
  };

  return (
    <motion.div
      variants={pageAnimations}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <BackButton className="md:hidden" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
            <p className="text-muted-foreground">
              Manage and track your project tasks.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="flex-1 md:flex-none">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div
          variants={pageAnimations}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <TaskColumn
                  title={column.title}
                  tasks={tasks.filter((task) => task.status === column.status)}
                  provided={provided}
                  onUpdateProgress={handleUpdateProgress}
                />
              )}
            </Droppable>
          ))}
        </motion.div>
      </DragDropContext>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedTask ? 'Edit Task' : 'Create Task'}
            </DialogTitle>
          </DialogHeader>
          <TaskForm
            initialData={selectedTask}
            clients={clients}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedTask(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}