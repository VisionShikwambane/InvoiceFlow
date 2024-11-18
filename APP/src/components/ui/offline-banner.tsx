import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineBanner() {
  const isOffline = !navigator.onLine;

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-yellow-500/10 border-b border-yellow-500/20"
        >
          <div className="container flex items-center gap-2 px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400">
            <WifiOff className="h-4 w-4" />
            <span>You are offline. Some features may be limited.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}