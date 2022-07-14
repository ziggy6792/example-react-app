import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { IUser } from './domain-models/user';
import { ISearchUserRequest } from './request-types/user';

const queryClient = new QueryClient();

const defaultSearch: ISearchUserRequest = {
  // name: 'Simon',
};

const Users: React.FC = () => {
  const { data: users } = useQuery<IUser[]>(
    'users',
    () => fetch(`http://localhost:4100/searchUsers?${new URLSearchParams(defaultSearch as any).toString()}`).then((res) => res.json()),
    { suspense: true }
  );

  return (
    <div>
      {users?.map(({ name, age }) => (
        <>
          <div>Name: {name}</div> <div>Age: {age}</div>
        </>
      ))}
    </div>
  );
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
