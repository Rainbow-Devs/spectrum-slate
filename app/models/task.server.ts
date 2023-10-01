import type { Priority, Status, Task, User } from "@prisma/client";
import { prisma } from "~/db.server";

export function getTask({
  id,
  userId,
}: Pick<Task, "id"> & {
  userId: User["id"];
}) {
  return prisma.task.findFirst({
    where: { id: id },
  });
}

export function getAllTasks({ userId }) {
  return prisma.task.findMany({
    orderBy: { updatedAt: "desc" },
    where: { assigneeId: userId },
  });
}

export function createTask({
  title,
  description,
  assigneeId,
  dueDate,
  priority,
  status,
}: {
  title: string;
  description: string;
  assigneeId: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
}) {
  return prisma.task.create({
    data: {
      title,
      description,
      dueDate,
      priority,
      status,
      assigneeId
    },
  });
}
