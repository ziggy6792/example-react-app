import React, { Suspense } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const Users: React.FC = () => {
  const { data } = useQuery('users', () => fetch('http://localhost:4000/users').then((res) => res.json()), { suspense: true });

  return <div>{JSON.stringify(data)}</div>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
