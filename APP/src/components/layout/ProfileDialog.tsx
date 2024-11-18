import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Camera,
  CreditCard,
  Globe,
  Key,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Settings,
  User,
} from 'lucide-react';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    phone: '+1 (555) 000-0000',
    website: 'www.johndoe.com',
    bio: 'Freelance web developer specializing in React and Node.js',
  });

  const menuItems = [
    { icon: User, label: 'Personal Info', tab: 'personal' },
    { icon: Settings, label: 'Preferences', tab: 'preferences' },
    { icon: Key, label: 'Security', tab: 'security' },
    { icon: CreditCard, label: 'Billing', tab: 'billing' },
    { icon: Globe, label: 'Integrations', tab: 'integrations' },
    { icon: MessageSquare, label: 'Notifications', tab: 'notifications' },
    { icon: LifeBuoy, label: 'Help & Support', tab: 'support' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="grid grid-cols-5">
          {/* Sidebar */}
          <div className="col-span-2 border-r">
            <DialogHeader className="p-6">
              <DialogTitle>Profile Settings</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center border-b p-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="mt-4 font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="p-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.tab}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Content */}
          <div className="col-span-3">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsContent value="personal" className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={user.name} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <div className="flex gap-2">
                          <Input defaultValue={user.email} />
                          <Button variant="secondary" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Add additional email addresses
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <div className="flex gap-2">
                          <Input defaultValue={user.phone} />
                          <Button variant="secondary" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Website</Label>
                        <div className="flex gap-2">
                          <Input defaultValue={user.website} />
                          <Button variant="secondary" size="icon">
                            <Globe className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Bio</Label>
                        <Input defaultValue={user.bio} />
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}