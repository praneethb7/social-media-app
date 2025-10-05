import { FloatingNav } from "./ui/floating-navbar";
import { PlusSquare, MessageCircle } from "lucide-react";


function Nav() {
  const navItems = [
    {
      name: "Messages",
      link: "/messages",
      icon: (
        <MessageCircle className="h-5 w-5" />
      )
    },
    {
      name: "Create",
      link: "/upload",
      icon: (
        <PlusSquare className="h-5 w-6" />
      ),
    },
  ];
  return (<FloatingNav navItems={navItems} />)
}

export default Nav;