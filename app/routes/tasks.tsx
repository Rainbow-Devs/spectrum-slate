import { useLoaderData } from "@remix-run/react";
import TaskDisplay from "~/components/molecules/TaskDisplay";
import { getAllTasks } from "~/models/task.server";
import { requireUserId } from "~/session.server";
import Layout from "~/components/templates/Layout";

export const loader = async ({ request }) => {
  const id = await requireUserId(request);
  const tasks = await getAllTasks({ userId: id });
  return { userId: id, tasks };
};

export default function Tasks() {
  const tasks = useLoaderData().tasks;

  return (
    <Layout>
      <div id="container" className="flex h-[92%]">
        <div className="w-1/5 border border-blue-500 h-full"></div>
        <div className="w-4/5 border border-red-500 h-full p-3">
          <div className="flex justify-center">
            <h1 className="text-3xl">Tasks</h1>
          </div>
          <div>
            {tasks.map((task) => (
              <TaskDisplay key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
