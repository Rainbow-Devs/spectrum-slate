import { useEffect, useState } from "react";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useActionData, useSubmit } from "@remix-run/react";
import type { Task } from "@prisma/client";

interface EditTaskProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTask: Task;
}

export default function EditTask({
  open,
  setOpen,
  selectedTask,
}: EditTaskProps) {
  const [taskName, setTaskName] = useState(""); // TODO: [taskName, setTaskName
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [disableButton, setDisableButton] = useState(true); // TODO: [disableButton, setDisableButton
  const submit = useSubmit();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.success) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (selectedTask) {
      setTaskName(selectedTask.title);
      setDescription(selectedTask.description);
      if (selectedTask.dueDate) {
        const date = new Date(selectedTask.dueDate);
        // format date to yyyy-MM-dd
        const formattedDate = date.toISOString().split("T")[0];
        setDueDate(formattedDate);
      }
      setPriority(selectedTask.priority);
    }
  }, [selectedTask]);

  useEffect(() => {
    if (taskName && description && dueDate && priority) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [taskName, description, dueDate, priority]);

  const handleSubmit = () => {
    // check make sure values from state are not empty
    if (!taskName || !description || !dueDate || !priority) {
      return;
    }
    const formData = new FormData();
    formData.append("taskId", selectedTask.id.toString());
    formData.append("taskName", taskName);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("priority", priority);
    formData.append("intent", "edit");
    submit(formData, {
      method: "post",
    });
  };

  console.log(dueDate);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Label htmlFor="taskName">Task Name</Label>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          id="taskName"
        />
        <Label htmlFor="taskDescription">Task Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your message here."
        />
        <Label htmlFor="taskDueDate">Task Due Date</Label>
        <Input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          type="date"
          id="taskDueDate"
        />
        <Label htmlFor="taskPriority">Task Priority</Label>
        <Select value={priority} onValueChange={(value) => setPriority(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className="opacity-100 bg-white">
            <SelectItem className="cursor-pointer" value="HIGH">
              High
            </SelectItem>
            <SelectItem className="cursor-pointer" value={"MEDIUM"}>
              Medium
            </SelectItem>
            <SelectItem className="cursor-pointer" value="LOW">
              Low
            </SelectItem>
            <SelectItem className="cursor-pointer" value="URGENT">
              Urgent
            </SelectItem>
          </SelectContent>
        </Select>
        {actionData?.error && (
          <p className="text-red-500">{actionData.error}</p>
        )}
        <DialogFooter>
          <Button disabled={disableButton} onClick={handleSubmit}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
