import dynamic from 'next/dynamic';

const useDomains = (slug) => {
  const apiRoute = `/api/workspace/${slug}/domains`;
  const useSWR = dynamic(() => import('swr').then((mod) => mod.default), {
    ssr: false,
    loading: () => ({ data: null, error: null }),
  });
  const { data, error } = useSWR(apiRoute);
  return {
    domains: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDomains;
