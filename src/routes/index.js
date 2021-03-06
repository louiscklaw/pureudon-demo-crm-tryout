import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import DatatypesView from 'src/views/datatypes/DatatypesView';
import DatatypesViewOld from 'src/views/datatypes/DatatypesViewOld';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import HelloworldView from 'src/views/helloworld/HelloworldView';

import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import LogoutView from 'src/views/auth/LogoutView';
import RegisterView from 'src/views/auth/RegisterView';
import NotFoundView from 'src/views/errors/NotFoundView';

var ENV_PUBLIC_URL = process.env.PUBLIC_URL;

const routes = [
  {
    path: `${ENV_PUBLIC_URL}/app`,
    element: <DashboardLayout />,
    children: [
      { path: 'datatyles', element: <DatatypesView /> },
      { path: 'datatyles_old', element: <DatatypesViewOld /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'helloworld', element: <HelloworldView /> },
      { path: '*', element: <Navigate to={`${ENV_PUBLIC_URL}/404`} /> },
    ],
  },
  {
    path: `${ENV_PUBLIC_URL}/`,
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'logout', element: <LogoutView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to={`${ENV_PUBLIC_URL}/app/dashboard`} /> },
      { path: '*', element: <Navigate to={`${ENV_PUBLIC_URL}/404`} /> },
    ],
  },
];

export default routes;
