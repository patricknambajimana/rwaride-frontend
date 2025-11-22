 import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function PassengerProfileCard({ user }: { user: any }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="text-xl">
            {user?.name?.[0] || "P"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium">{user?.name}</p>
          <Badge variant="secondary">Passenger</Badge>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
        <div className="flex items-center gap-2">
          <span className="font-medium">Email:</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Phone:</span>
          <span>{user?.phone || "Not set"}</span>
        </div>
      </div>
    </div>
  );
}
