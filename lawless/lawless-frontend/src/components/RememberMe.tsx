import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAuthToken } from '../hooks/useAuthToken';
import useMe from '../hooks/useMe';
import useUserContext from '../hooks/useUserContext';

const RememberMe: React.FC = ({ children }) => {
  const [result, getMe] = useMe();
  const { authToken } = useAuthToken();
  const { setUser } = useUserContext();
  useEffect(() => {
    if (authToken) {
      const token = authToken as string;
      getMe({ authToken: token });
    }
  }, [getMe, authToken]);

  useEffect(() => {
    if (result.data) {
      setUser({
        ...result.data.userPersonalData,
        roles: result.data.roles?.map((item) => item.name?.toString()) ?? [],
      });
    }
  }, [result.data, setUser]);

  return <> {result.isLoading ? <CircularProgress /> : children} </>;
};

export default RememberMe;
