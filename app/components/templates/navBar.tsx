import {
  NavigationMenu,
  NavigationMenuList,
} from "~/components/organisms/navigation-menu";
import { Form, Link } from "@remix-run/react";

export const NavBar = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-slate-800 p-4 text-white h-[8%]">
        <NavigationMenu>
          <NavigationMenuList>
            <Link to="/notes" className="px-4">
              Notes
            </Link>
            <Link className="px-4" to="/profile">
              Profile
            </Link>
            <Link to="/tasks" className="px-4">
              Tasks
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </div>
    </>
  );
};
