// profile form component where users can edit their information

import React, { useState } from "react";
import { Form } from "@remix-run/react";
import { Input } from "~/components/atoms/input";
import { Label } from "~/components/atoms/label";
import { Button } from "~/components/atoms/button";
import { useOptionalUser } from "~/utils";
import { redirect } from "@remix-run/node";
import { updateUserById } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { NavBar } from "~/components/templates/nav-bar";

export const action = async ({ request }) => {
  const id = await requireUserId(request);
  const formData = await request.formData();
  const email = formData.get("email");
  const fullName = formData.get("fullName");
  const wakeUpTime = formData.get("wakeUpTime");
  const bedTime = formData.get("bedTime");
  // update user information
  await updateUserById(id, {
    email,
    fullName,
    wakeUpTime,
    bedTime,
  });
  return redirect("/profile");
};

export default function ProfileForm() {
  const user = useOptionalUser();
  const [email, setEmail] = useState(user?.email ?? "");
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [wakeUpTime, setWakeUpTime] = useState(user?.wakeUpTime ?? "");
  const [bedTime, setBedTime] = useState(user?.bedTime ?? "");

  return (
    <>
      <NavBar />
      <Form
        method="post"
        className="flex justify-center items-center flex-col gap-2"
      >
        <h1 className="mt-10 text-3xl">Profile</h1>
        <div className="w-1/3">
          <Label>
            <span>Name</span>
            <Input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Label>
          <Label>
            <span>Email</span>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
          <Label></Label>
          <Label>
            <span>Preferred Wake Up Time</span>
            <Input
              type="time"
              name="wakeUpTime"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
            />
          </Label>
          <Label>
            <span>Preferred Bed Time</span>
            <div>
              <Input
                name="bedTime"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="text-m border-2 p-2"
                type="time"
              />
            </div>
          </Label>
          <Button
            variant="outline"
            className="mt-5 bg-slate-700 text-white"
            type="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </>
  );
}
