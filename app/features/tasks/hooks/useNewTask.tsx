import { useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";

export function useNewTask(){
 const [title, setTitle] = useState(""); // TODO: [title, setTitle
 const [description, setDescription] = useState("");
 const [dueDate, setDueDate] = useState("");
 const [priority, setPriority] = useState("");
 const [open, setOpen] = useState(false);
 const [disableButton, setDisableButton] = useState(true); // TODO: [disableButton, setDisableButton
 const submit = useSubmit();
 const actionData = useActionData();

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
    open,
    setOpen,
    actionData
  }
}