import dynamic from 'next/dynamic';

const useDomain = (domain) => {
  const apiRoute = `/api/workspace/domain/check?domain=${domain}`;
  const useSWR = dynamic(() => import('swr').then((mod) => mod.default), {
    ssr: false,
    loading: () => ({ data: null, error: null }),
  });
  const { data, error } = useSWR(apiRoute);
  return {
    domainData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useDomain;
