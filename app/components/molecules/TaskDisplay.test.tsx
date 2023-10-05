import React from "react";
import { render, screen } from "@testing-library/react";
import TaskDisplay from "./TaskDisplay";
import type { Task } from "@prisma/client";
import "@testing-library/jest-dom";

const task = {
  id: 1,
  title: "Test Task",
  status: "In Progress",
  dueDate: new Date("01-01-2022"),
} as unknown as Task;

describe("TaskDisplay", () => {
  it("renders the task title", () => {
    render(<TaskDisplay handleEditTask={jest.fn} task={task} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("renders the task status", () => {
    render(<TaskDisplay handleEditTask={jest.fn} task={task} />);
    expect(screen.getByText("Status: In Progress")).toBeInTheDocument();
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
