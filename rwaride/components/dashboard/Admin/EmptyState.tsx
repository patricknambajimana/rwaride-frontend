import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  message: string;
}

export function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="text-center py-12 text-gray-500">
      <div className="mx-auto mb-4">{icon}</div>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
