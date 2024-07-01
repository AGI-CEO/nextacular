import dynamic from 'next/dynamic';

const useMembers = (slug) => {
  const apiRoute = `/api/workspace/${slug}/members`;
  const useSWR = dynamic(() => import('swr').then((mod) => mod.default), {
    ssr: false,
    loading: () => ({ data: null, error: null }),
  });
  const { data, error } = useSWR(apiRoute);
  return {
    members: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMembers;
