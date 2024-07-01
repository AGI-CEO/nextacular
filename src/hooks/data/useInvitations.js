import dynamic from 'next/dynamic';

const useInvitations = () => {
  const apiRoute = `/api/workspaces/invitations`;
  const useSWR = dynamic(() => import('swr').then((mod) => mod.default), {
    ssr: false,
    loading: () => ({ data: null, error: null }),
  });
  const { data, error } = useSWR(apiRoute);
  return {
    invitations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useInvitations;
