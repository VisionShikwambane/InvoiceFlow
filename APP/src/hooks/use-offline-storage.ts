import { useState, useEffect } from 'react';
import { db } from '@/lib/db';

export function useOfflineStorage<T extends { id: string }>(
  storeName: 'clients' | 'invoices' | 'tasks',
  onlineData: T[]
) {
  const [data, setData] = useState<T[]>(onlineData);
  const [pendingChanges, setPendingChanges] = useState<{
    adds: T[];
    updates: T[];
    deletes: string[];
  }>({
    adds: [],
    updates: [],
    deletes: [],
  });

  // Load data from IndexedDB when offline
  useEffect(() => {
    const loadOfflineData = async () => {
      try {
        const offlineData = await db[storeName].toArray();
        setData(offlineData as T[]);
      } catch (error) {
        console.error('Error loading offline data:', error);
      }
    };

    if (!navigator.onLine) {
      loadOfflineData();
    }
  }, [storeName]);

  // Save changes to IndexedDB when offline
  const saveChange = async (
    type: 'add' | 'update' | 'delete',
    item: T | string
  ) => {
    try {
      if (!navigator.onLine) {
        if (type === 'delete') {
          await db[storeName].delete(item as string);
          setPendingChanges(prev => ({
            ...prev,
            deletes: [...prev.deletes, item as string],
          }));
        } else {
          const record = item as T;
          await db[storeName].put(record);
          setPendingChanges(prev => ({
            ...prev,
            [type === 'add' ? 'adds' : 'updates']: [
              ...prev[type === 'add' ? 'adds' : 'updates'],
              record,
            ],
          }));
        }
      }
    } catch (error) {
      console.error('Error saving offline change:', error);
    }
  };

  // Sync changes when coming back online
  useEffect(() => {
    const syncChanges = async () => {
      if (pendingChanges.adds.length === 0 &&
          pendingChanges.updates.length === 0 &&
          pendingChanges.deletes.length === 0) {
        return;
      }

      try {
        // Here you would implement the actual sync with your backend
        console.log('Syncing changes:', pendingChanges);
        
        // Clear pending changes after successful sync
        setPendingChanges({
          adds: [],
          updates: [],
          deletes: [],
        });
      } catch (error) {
        console.error('Error syncing changes:', error);
      }
    };

    const handleOnline = () => {
      syncChanges();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [pendingChanges]);

  return {
    data,
    saveChange,
    pendingChanges,
  };
}