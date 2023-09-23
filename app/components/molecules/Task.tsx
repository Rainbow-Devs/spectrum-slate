import React from "react";
import type { Task } from "@prisma/client";

interface TaskProps {
  task: Task;
}

export default function TaskDisplay({ task }: TaskProps) {
  return (
    <li className="prose lg:prose-xl">
      <h2>Title: {task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Created Date: {task.createdAt.toLocaleString()}</p>
      <p>Status: {task.status}</p>
    </li>
  );
}
