import { useEffect, useState } from 'react';
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
import React from 'react'; 
import { getClients, addClient } from '../services/clientService';

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
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getClients(); // Call the service
        setClients(response.data); // Set the fetched data
        console.log(response.data);
       // setLoading(false);
      } catch (err: any) {
        console.error('Error fetching clients:', err);
        //setError(err.message || 'Error fetching clients');
        //setLoading(false);
      }
    };

    fetchData();
  }, []);
 

  const filteredClients = clients.filter((client) => {
    console.log("Client", client);
    const matchesSearch = client?.name
      ? client.name.toLowerCase().includes(search.toLowerCase())
      : false;
    const matchesStatus = statusFilter === 'all'
      ? true
      : client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });




  const handleSubmit = async (data: Omit<Client, 'id' | 'createdAt'>) => {
      try {
        const response = await addClient(data);
        setClients(prevClients => [...prevClients, response.data]);
        
        toast({
          title: 'Success',
          description: 'Client added successfully',
        });
      } catch (error: any) {
        console.error('Error adding client:', error);
        toast({
          title: 'Error',
          description: 'Failed to add client. Please try again.',
          variant: 'destructive',
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