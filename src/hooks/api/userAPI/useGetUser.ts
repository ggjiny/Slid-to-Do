import userAPI from '@app/api/userAPI';
import { useQuery } from '@tanstack/react-query';

function useGetUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: userAPI.getUser,
  });
}

export default useGetUser;
