import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserX, CheckCircle } from "lucide-react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
}

interface UsersTableProps {
  users: AdminUser[];
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
}

export function UsersTable({ users, onSuspend, onActivate }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </div>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="secondary">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "active" ? "default" : "destructive"}
              >
                {user.status || "active"}
              </Badge>
            </TableCell>
            <TableCell>
              {!user.status || user.status === "active" ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSuspend(user.id)}
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onActivate(user.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UsersTable;
