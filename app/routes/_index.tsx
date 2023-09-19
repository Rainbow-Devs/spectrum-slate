import { json, type ActionArgs, type V2_MetaFunction } from "@remix-run/node";
import * as React from "react";
import { Form, Link, useActionData, useNavigate } from "@remix-run/react";
import Copyright from "~/components/atoms/Copyright";

import { useOptionalUser, validateEmail } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import { useEffect } from "react";
import { Button } from "~/components/atoms/button";
import { Label } from "~/components/atoms/label";
import { Input } from "~/components/atoms/input";
import { Checkbox } from "~/components/atoms/checkbox";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const remember = formData.get("remember");
  console.log(remember, "remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 },
    );
  }

  return createUserSession({
    redirectTo: "/notes",
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export default function Index() {
  const user = useOptionalUser();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/notes");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="sm:flex sm:flex-col md:flex-row">
      <div className="bg-[url('https://source.unsplash.com/random?wallpapers')] bg-no-repeat bg-cover h-80 w-full md:w-1/2 md:h-screen"></div>
      <div className="flex flex-col items-center md:justify-center md:items-center sm:h-1/2 md:h-screen sm:w-2/4">
        <h1 className="text-2xl font-bold mb-5 mt-5 md:mt-0">Sign in</h1>
        <Form
          method="post"
          className="flex flex-col justify-center items-center w-3/4 md:w-1/2"
        >
          <Input
            required
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="email"
            className="mb-5"
          />
          {actionData?.errors?.email && (
            <p className="text-red-500 text-sm">{actionData.errors.email}</p>
          )}
          <Input
            type="password"
            name="password"
            placeholder="password"
            className="mb-5"
          />

          {actionData?.errors?.password && (
            <p className="text-red-500 text-sm">{actionData.errors.password}</p>
          )}
          <div className="flex flex-row justify-center">
            <Label
              htmlFor="remember"
              className="flex items-center justify-between mr-5"
            >
              Remember Me
            </Label>
            <Checkbox id="remember" name="remember" />
          </div>
          <Button
            className="mb-5 mt-5 bg-slate-600 text-white"
            variant="outline"
          >
            Sign In
          </Button>
        </Form>
        <div>
          <div>
            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
          </div>
        </div>
        <Copyright sx={{ mt: 5 }} />
      </div>
    </div>
  );
}
