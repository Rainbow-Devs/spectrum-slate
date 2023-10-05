import { Button } from "../../components/atoms/button";
import { Input } from "../../components/atoms/input";
import { Label } from "../../components/atoms/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { useNewTask } from "./hooks/useNewTask";

export default function NewTask() {
 const {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    setPriority,
    disableButton,
    handleSubmit,
    actionData,
    open,
    setOpen,
 } = useNewTask();
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
