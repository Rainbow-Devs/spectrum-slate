import React from "react";
import { render, screen } from "@testing-library/react";
import TaskDisplay from "./TaskDisplay";
import { Priority, Status, type Task } from "@prisma/client";
import "@testing-library/jest-dom";

const task: Task = {
  id: 1,
  title: "Test Task",
  dueDate: new Date("01-01-2022"),
  description: "Test task description",
  assigneeId: "1",
  priority: Priority.LOW,
  createdAt: new Date("2023-12-21"),
  updatedAt: new Date("2023-12-21"),
  category: "Test",
  label: [],
  status: Status.IN_PROGRESS
};

describe("TaskDisplay", () => {
  it("renders the task title", () => {
    render(<TaskDisplay handleEditTask={jest.fn} task={task} />);
    expect(screen.getByText(task.title)).toBeInTheDocument();
  });

  it("renders the task status", () => {
    render(<TaskDisplay handleEditTask={jest.fn} task={task} />);
    expect(screen.getByText("Status: IN PROGRESS")).toBeInTheDocument();
  });

  it("renders the task due date", () => {
    render(<TaskDisplay handleEditTask={jest.fn} task={task} />);
    expect(screen.getByText("Due: Jan 1, 2022")).toBeInTheDocument();
  });

  it("does not render the task due date if it is null", () => {
    const taskWithoutDueDate = { ...task, dueDate: null };
    render(<TaskDisplay handleEditTask={jest.fn} task={taskWithoutDueDate} />);
    expect(screen.queryByText("Due:")).not.toBeInTheDocument();
  });
});
