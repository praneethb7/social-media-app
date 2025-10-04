import { Link } from "react-router-dom";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", to: "/home" },
  { icon: Search, label: "Search", to: "/search" },
  { icon: Compass, label: "Explore", to: "/explore" },
  { icon: MessageCircle, label: "Messages", to: "/messages" },
  { icon: Heart, label: "Notifications", to: "/notifications" },
  { icon: PlusSquare, label: "Create", to: "/upload" },
  { icon: User, label: "Profile", to: "/profile" },
];

export default function LeftHome() {
  return (
    <div className="flex flex-col justify-between h-screen w-62 bg-black text-white border-r border-stone-800">
      <div>
        <div className="flex items-center px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight">LUME</h1>
        </div>

        <nav className="mt-4 space-y-2">
          {menuItems.map(({ icon: Icon, label, to }) => (
            <div key={label} className="mx-4">
              <Link
                to={to}
                className="flex items-center w-full px-4 py-3 rounded-lg transition-colors hover:bg-stone-900"
              >
                <Icon className="w-6 h-6" />
                <span className="ml-4">{label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </div>

      <div className="px-6 py-5 border-t border-stone-800">
        <Link
          to="/logout"
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-stone-900 transition-colors"
        >
          <LogOut className="w-6 h-6" />
          <span className="ml-4">Log out</span>
        </Link>
      </div>
    </div>
  );
}
