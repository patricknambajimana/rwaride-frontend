import { Bell } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function NotificationBell({ userId }: { userId?: string | number }) {
  const [count] = useState(0);
  return (
    <div className="relative">
      <button className="p-2 rounded-md hover:bg-gray-100">
        <Bell className="w-5 h-5 text-gray-600" />
      </button>
      {count > 0 && (
        <span className="absolute -top-1 -right-1">
          <Badge>{count}</Badge>
        </span>
      )}
    </div>
  );
}

export default NotificationBell;
