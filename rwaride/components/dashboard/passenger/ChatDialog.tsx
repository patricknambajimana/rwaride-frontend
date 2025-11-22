"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatDialog({
  open,
  onClose,
  tripId,
  recipientId,
  recipientName,
}: {
  open: boolean;
  onClose: () => void;
  tripId: string;
  recipientId: string;
  recipientName: string;
}) {
  const [messages, setMessages] = React.useState<
    Array<{ id: string; text: string; fromMe?: boolean }>
  >([]);
  const [text, setText] = React.useState("");

  const send = () => {
    if (!text.trim()) return;
    const m = { id: String(Date.now()), text: text.trim(), fromMe: true };
    setMessages((s) => [...s, m]);
    setText("");
    // TODO: wire to real API/websocket
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat with {recipientName || "Driver"}</DialogTitle>
        </DialogHeader>

        <div className="min-h-[200px] max-h-80 overflow-auto space-y-2 mt-4">
          {messages.length === 0 && (
            <div className="text-sm text-gray-500">No messages yet</div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={m.fromMe ? "text-right" : "text-left"}>
              <div
                className={`inline-block px-3 py-2 rounded ${
                  m.fromMe
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a message..."
          />
          <Button onClick={send}>Send</Button>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ChatDialog;
