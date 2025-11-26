import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl mt-1">{value}</p>
          </div>
          <div className="text-green-500">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
