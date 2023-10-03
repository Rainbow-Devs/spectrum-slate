import { useLoaderData } from "@remix-run/react";
import TaskDisplay from "~/components/molecules/TaskDisplay";
import { createTask, getAllTasks, editTask } from "~/models/task.server";
import { requireUserId } from "~/session.server";
import Layout from "~/components/templates/Layout";
import styled from "@emotion/styled";
import NewTask from "~/components/organisms/NewTask";
import type { Priority } from "@prisma/client";
import { Status } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import EditTask from "~/components/organisms/EditTask";
import { useState } from "react";

export const loader = async ({ request }) => {
  const id = await requireUserId(request);
  const tasks = await getAllTasks({ userId: id });
  return { userId: id, tasks };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const id = await requireUserId(request);
  const taskName = formData.get("taskName");
  const description = formData.get("description");
  const dueDate = formData.get("dueDate");
  const priority = formData.get("priority");
  const intent = formData.get("intent");

  if (intent === "edit") {
    const taskId = formData.get("taskId");
    if (taskId && taskName && description && dueDate && priority) {
      try {
        await editTask({
          id: Number(taskId),
          title: taskName.toString(),
          description: description.toString(),
          dueDate: new Date(dueDate.toString()),
          priority: priority.toString() as Priority,
          status: Status.NOT_STARTED,
        });
        return { success: true };
      } catch (e) {
        return {
          error: "Something went wrong",
        };
      }
    } else {
      return {
        error: "Missing required fields",
      };
    }
  }

  // if date is before current date return error
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate.toString());
  if (dueDateObj < currentDate) {
    return {
      error: "Due date must be after current date",
    };
  }
  if (taskName && description && dueDate && priority) {
    try {
      await createTask({
        assigneeId: id.toString(),
        title: taskName.toString(),
        description: description.toString(),
        dueDate: new Date(dueDate.toString()),
        priority: priority.toString() as Priority,
        status: Status.NOT_STARTED,
      });
      // redirect to tasks
      return { success: true };
    } catch (e) {
      return {
        error: "Something went wrong",
      };
    }
  } else {
    return {
      error: "Missing required fields",
    };
  }
};

export default function Tasks() {
  const tasks = useLoaderData().tasks;
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const editTaskHandler = (e, task) => {
    if (e.detail === 2) {
      setSelectedTask(task);
      setEditTaskOpen(true);
    }
  };

  return (
    <Layout>
      <div id="container" className="flex h-[92%] flex-col md:flex-row">
        <TaskFilterDiv className="">
          <NewTask />
          <EditTask
            open={editTaskOpen}
            setOpen={setEditTaskOpen}
            selectedTask={selectedTask}
          />
          <h2>Quick Filters</h2>
          <h2>All Tasks (6)</h2>
          <h2>Due Today (5)</h2>
          <h2>Due This Week (4)</h2>
          <h2>Overdue (6)</h2>
        </TaskFilterDiv>
        <div className="w-5/5 md:w-4/5 border h-full p-3 overflow-scroll">
          <div className="flex justify-center">
            <h1 className="text-3xl">Tasks</h1>
          </div>
          <div className="flex flex-wrap justify-center md:justify-normal">
            {tasks.map((task) => (
              <TaskDisplay
                key={task.id}
                task={task}
                handleEditTask={editTaskHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const TaskFilterDiv = styled.div`
  width: 100%;
  border: 1px solid slategray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  button {
    margin: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
  }

  h2 {
    margin: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
  }

  h1 {
    margin: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bolder;
  }

  @media (min-width: 768px) {
    width: 20%;
    height: 100%;
    align-items: flex-start;
    padding: 1.25rem;
  }

  /* Add any additional styles for prose and prose-sm here */
`;
