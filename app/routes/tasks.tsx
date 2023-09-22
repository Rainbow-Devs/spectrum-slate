import { useLoaderData } from "@remix-run/react";
import TaskDisplay from "~/components/molecules/Task";
import { getAllTasks } from "~/models/task.server";
import { requireUserId } from "~/session.server";
import Layout from "~/components/templates/Layout";

export const loader = async ({ request }) => {
  const id = await requireUserId(request);
  const tasks = await getAllTasks({ userId: id });
  return { userId: id, tasks };
};

export default function Tasks() {
  const user = useLoaderData().user;
  const tasks = useLoaderData().tasks;
  console.log(tasks, "tasks");
  console.log(user, "user");

  return (
    <Layout>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <TaskDisplay key={task.id} task={task} />
        ))}
      </ul>
    </Layout>
  );
}
