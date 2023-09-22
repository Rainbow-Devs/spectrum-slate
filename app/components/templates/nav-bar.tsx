import {
  NavigationMenu,
  NavigationMenuList,
} from "~/components/organisms/navigation-menu";
import { Form, Link } from "@remix-run/react";

export const NavBar = () => {
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <NavigationMenu>
        <NavigationMenuList>
          <Link to="/notes" className="mr-5">
            Notes
          </Link>
          <Link className="mr-5" to="/profile">
            Profile
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
    </header>
  );
};
