import React from 'react';
import { Box, Collapse, List } from '@material-ui/core';

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

import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

const ENV_PUBLIC_URL = process.env.PUBLIC_URL;

export default function NavCollapseMenu({ title, sub_items }) {
  let [test_open, setTestOpen] = React.useState(false);

  const handleTestClick = () => {
    setTestOpen(!test_open);
  };

  return (
    <>
      <NavCollapse
        open={test_open}
        key={'Login'}
        title={title}
        icon={LockIcon}
        open={test_open}
        setOpen={setTestOpen}
      />

      <Collapse in={test_open} timeout="auto" unmountOnExit>
        <Box>
          <List>
            {sub_items.map((item) => {
              return (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              );
            })}
          </List>
        </Box>
      </Collapse>
    </>
  );
}
