import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientsTable } from '@/components/clients/ClientsTable';
import { ClientForm } from '@/components/clients/ClientForm';
import { Client } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

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

export function Clients() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const { toast } = useToast();
  const { confirm } = useConfirmDialog();

  // Mock data - replace with actual data fetching
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 000-0000',
      projectName: 'Website Redesign',
      status: 'In Progress',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1 (555) 111-1111',
      projectName: 'Mobile App Development',
      status: 'Completed',
      createdAt: new Date().toISOString(),
    },
  ]);

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all'
      ? true
      : client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (data: Omit<Client, 'id' | 'createdAt'>) => {
    if (selectedClient) {
      // Update existing client
      setClients(clients.map(client => 
        client.id === selectedClient.id 
          ? { ...client, ...data }
          : client
      ));
      toast({
        title: 'Success',
        description: 'Client updated successfully',
      });
    } else {
      // Add new client
      const newClient: Client = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...data,
      };
      setClients([...clients, newClient]);
      toast({
        title: 'Success',
        description: 'Client added successfully',
      });
    }
    setIsDialogOpen(false);
    setSelectedClient(undefined);
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsDialogOpen(true);
  };

  const handleDelete = async (client: Client) => {
    confirm({
      title: 'Delete Client',
      description: `Are you sure you want to delete ${client.name}? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
      onConfirm: () => {
        setClients(clients.filter(c => c.id !== client.id));
        toast({
          title: 'Success',
          description: 'Client deleted successfully',
        });
      },
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
            <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
            <p className="text-muted-foreground">
              Manage your client relationships and projects.
            </p>
          </div>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <motion.div variants={itemAnimation} className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-xs"
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemAnimation}>
        <ClientsTable
          clients={filteredClients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedClient ? 'Edit Client' : 'Add Client'}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            initialData={selectedClient}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsDialogOpen(false);
              setSelectedClient(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}