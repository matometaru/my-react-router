import './App.css';
import { router } from './router'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://a6b36f4a0e0e97ebbc179ca2a6a9f75d@o328086.ingest.sentry.io/4506215843102720",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  beforeSend(event, hint) {
    console.log("◼︎◼︎◼︎ An error has been caught and will be sent to Sentry:", event);
    return event;
  }
});

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
