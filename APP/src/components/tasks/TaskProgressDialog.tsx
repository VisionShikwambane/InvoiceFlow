import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Task } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TaskProgressDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateProgress: (taskId: string, progressStatus: Task['progressStatus']) => void;
}

const progressOptions: Task['progressStatus'][] = [
  'Not Started',
  'Started',
  '25% Done',
  '50% Done',
  '75% Done',
  'Almost Done',
  'Completed',
];

export function TaskProgressDialog({
  task,
  open,
  onOpenChange,
  onUpdateProgress,
}: TaskProgressDialogProps) {
  const [selectedProgress, setSelectedProgress] = useState<Task['progressStatus']>(
    task.progressStatus
  );

  const getProgressValue = (status: Task['progressStatus']) => {
    switch (status) {
      case 'Completed':
        return 100;
      case 'Almost Done':
        return 90;
      case '75% Done':
        return 75;
      case '50% Done':
        return 50;
      case '25% Done':
        return 25;
      case 'Started':
        return 10;
      default:
        return 0;
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

  const handleUpdateProgress = () => {
    onUpdateProgress(task.id, selectedProgress);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task Progress</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Task Progress</Label>
            <Select
              value={selectedProgress}
              onValueChange={(value) => setSelectedProgress(value as Task['progressStatus'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select progress status" />
              </SelectTrigger>
              <SelectContent>
                {progressOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{getProgressValue(selectedProgress)}%</span>
            </div>
            <Progress
              value={getProgressValue(selectedProgress)}
              className="h-2"
              indicatorClassName={getProgressColor(selectedProgress)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProgress}>Update Progress</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}