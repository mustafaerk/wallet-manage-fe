import Dashboard from "assets/icons/Dashboard.svg";
import Outgoing from "assets/icons/Outgoing.svg";
import Tranform from "assets/icons/Tranform.svg";
import Income from "assets/icons/Income.svg";
import Category from "assets/icons/Category.svg";

export const SidebarList = [
    { text: 'DashBoard', icon: Dashboard, route: '/' },
    { text: 'Outgoing', icon: Outgoing, route: '/outgoing' },
    { text: 'Incomes', icon: Income, route: '/incomes' },
    { text: 'Add New Transaction', icon: Tranform, route: '/newTransaction' },
    { text: 'Category', icon: Category, route: '/category' },
]
