import {
    ArrowRightLeft,
    CalendarCheck,
    Compass,
    Hospital,
    KeyRound,
    LucideIcon,
    MessageSquareReply,
    Settings,
    Shapes,
    ShieldCheck,
    Stethoscope,
    Users
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/tenders",
                    label: "Tenders",
                    active: pathname.includes("/tenders"),
                    icon: ArrowRightLeft,
                    submenus: []
                },
                {
                    href: "/bids",
                    label: "Bids",
                    active: pathname.includes("/bids"),
                    icon: Shapes,
                    submenus: []
                }
            ]
        }
    ];
}  