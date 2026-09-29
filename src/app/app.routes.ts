import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { EntriesPage } from './pages/entries-page/entries-page';
import { StatsPage } from './pages/stats-page/stats-page';

export const routes: Routes = [
    {"path": "", "component": HomePage},
    {"path": "register", "component": RegisterPage},
    {"path": "login", "component": LoginPage},
    {"path": "entries", "component": EntriesPage},
    {"path": "stats", "component": StatsPage},
];
