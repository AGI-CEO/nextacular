import dynamic from 'next/dynamic';

const useWorkspaces = () => {
  const apiRoute = `/api/workspaces`;
  const useSWR = dynamic(() => import('swr').then((mod) => mod.default), {
    ssr: false,
    loading: () => ({ data: null, error: null }),
  });
  const { data, error } = useSWR(apiRoute);
  return {
    workspaces: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useWorkspaces;
