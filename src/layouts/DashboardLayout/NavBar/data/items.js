import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'react-feather';

const ENV_PUBLIC_URL = process.env.PUBLIC_URL;

const items = [
  { href: `${ENV_PUBLIC_URL}/app/datatyles`, icon: BarChartIcon, title: 'datatyles' },
  { href: `${ENV_PUBLIC_URL}/app/datatyles_old`, icon: BarChartIcon, title: 'datatyles_old' },
  { href: `${ENV_PUBLIC_URL}/app/dashboard`, icon: BarChartIcon, title: 'Dashboard' },
  { href: `${ENV_PUBLIC_URL}/app/helloworld`, icon: BarChartIcon, title: 'Helloworld' },
  {
    icon: BarChartIcon,
    title: 'DeepNavTest',
    sub_items: [
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test1`, icon: BarChartIcon, title: 'deep-link-test1' },
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test2`, icon: BarChartIcon, title: 'deep-link-test2' },
    ],
  },
  {
    icon: BarChartIcon,
    title: 'DeepNavTest1',
    sub_items: [
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test1`, icon: BarChartIcon, title: 'deep-link-test1' },
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test2`, icon: BarChartIcon, title: 'deep-link-test2' },
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test3`, icon: BarChartIcon, title: 'deep-link-test3' },
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test4`, icon: BarChartIcon, title: 'deep-link-test4' },
      { href: `${ENV_PUBLIC_URL}/app/deep-link-test5`, icon: BarChartIcon, title: 'deep-link-test5' },
    ],
  },
  { href: `${ENV_PUBLIC_URL}/app/customers`, icon: UsersIcon, title: 'Customers' },
  { href: `${ENV_PUBLIC_URL}/app/products`, icon: ShoppingBagIcon, title: 'Products' },
  { href: `${ENV_PUBLIC_URL}/app/account`, icon: UserIcon, title: 'Account' },
  { href: `${ENV_PUBLIC_URL}/app/settings`, icon: SettingsIcon, title: 'Settings' },
  { href: `${ENV_PUBLIC_URL}/login`, icon: LockIcon, title: 'Login' },
  { href: `${ENV_PUBLIC_URL}/register`, icon: UserPlusIcon, title: 'Register' },
  { href: `${ENV_PUBLIC_URL}/404`, icon: AlertCircleIcon, title: 'Error' },
];

export default items;
