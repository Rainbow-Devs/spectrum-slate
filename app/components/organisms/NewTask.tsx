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

export default function NewTask() {
  const [title, setTitle] = useState(""); // TODO: [title, setTitle
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);
  const [disableButton, setDisableButton] = useState(true); // TODO: [disableButton, setDisableButton
  const submit = useSubmit();
  const actionData = useActionData();
  console.log(actionData);

  useEffect(() => {
    if (actionData?.success) {
      setOpen(false);
    }
  }, [actionData]);

  useEffect(() => {
    if (title && description && dueDate && priority) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [title, description, dueDate, priority]);

  const handleSubmit = () => {
    // check make sure values from state are not empty
    if (!title || !description || !dueDate || !priority) {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("priority", priority);
    submit(formData, {
      method: "post",
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <h1>Add New Task</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Label htmlFor="title">Task Name</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
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
        <Select onValueChange={(value) => setPriority(value)}>
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
