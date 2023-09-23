import React from "react";
import type { Task } from "@prisma/client";
import { Card } from "../ui/card";
import { StatusDot } from "../atoms/StatusDot";

interface TaskProps {
  task: Task;
}

export default function TaskDisplay({ task }: TaskProps) {
  const formatDate = (date: Date) => {
    // if (date === null) {
    //   return "";
    // }
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const dueDate = formatDate(task?.dueDate);
  return (
    <Card className="w-[30%] m-6 p-3 flex items-center">
      <StatusDot status={task.status} />
      <div className="ml-3 text-m">
        <h2 className="text-m">Title: {task.title}</h2>
        <p className="text-sm">Status: {task.status}</p>
        {dueDate && <p className="text-sm text-slate-500">Due: {dueDate}</p>}
      </div>
    </Card>
  );
}
