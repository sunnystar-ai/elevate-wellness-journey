
import { PlusCircle } from 'lucide-react';

const ProfileSnapshot = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <PlusCircle className="h-6 w-6 text-primary" />
      <div>
        <h3 className="text-sm font-medium">Sarah</h3>
        <p className="text-xs text-muted-foreground">12 connections</p>
      </div>
    </div>
  );
};

export default ProfileSnapshot;
