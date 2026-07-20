# Time Registration — UI kit

Recreation of the CFE / VMA **time-registration** screen (the "Add registration" form from the styling guide), paired with the day's registration grid.

## Screen
- `index.html` — interactive: fill the form and **Submit and continue / clear** appends a row to the day grid and updates the "registered today" progress toward 8h. Reuses the shared `AppHeader` / `AppFooter` from `../mom-dashboard/AppShell.jsx`.

## Files
- `RegistrationApp.jsx` — the screen (`window.RegistrationApp`), composing `Card`, `Input`, `Select`, `Button`, `IconButton`, `DataTable`, `Badge`, `Icon`.

Primitives come from the compiled bundle via `window.CFEDesignSystem_1ee1e2`.
