import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CalendarGridPage from './components/CalendarGridPage';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CalendarGridPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
