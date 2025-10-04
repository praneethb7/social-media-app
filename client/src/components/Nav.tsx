import { FloatingNav } from "./ui/floating-navbar";
import { IconMessage, IconPlus } from "@tabler/icons-react";



function Nav() {
    const navItems = [
      {
        name: "Messages",
        link: "/messages",
        icon:(
          <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white"/>
        )
      },
    {
      name: "Create",
      link: "/upload",
      icon: (
        <IconPlus className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
    return (<FloatingNav navItems={navItems} className=""/>)
}

export default Nav;