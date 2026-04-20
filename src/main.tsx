import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/pt-br';
import { RouterProvider } from 'react-router/dom';
import { UserProvider } from './hooks/use-user';
import { router } from './routes/routes';
import { GlobalStyle } from './styles/GlobalStyles';

// biome-ignore lint/style/noNonNullAssertion: root element is guaranteed to exist
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <GlobalStyle />
      <MantineProvider>
        <DatesProvider
          settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0, 6] }}
        ></DatesProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </UserProvider>
  </StrictMode>,
);
