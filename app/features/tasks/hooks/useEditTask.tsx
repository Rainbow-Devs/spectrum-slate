import { useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

interface UseEditProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedTask: any;
}

export function useEditTask({ open, setOpen, selectedTask }: UseEditProps) {
  const [title, setTitle] = useState(""); // TODO: [title, setTitle
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
      setTitle(selectedTask.title);
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
     formData.append("taskId", selectedTask.id.toString());
     formData.append("title", title);
     formData.append("description", description);
     formData.append("dueDate", dueDate);
     formData.append("priority", priority);
     formData.append("intent", "edit");
     submit(formData, {
       method: "post",
     });
   };

  return {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    disableButton,
    handleSubmit,
    actionData
  };
}
