import asyncComponent from 'lib/asyncComponent';

export const AuthPage = asyncComponent(() => import('./AuthPage'));
export const HomePage = asyncComponent(() => import('./HomePage'));
export const UserPage = asyncComponent(() => import('./UserPage'));