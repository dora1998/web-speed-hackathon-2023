import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { debounce } from 'throttle-debounce';

import type { GetZipcodeQueryResponse } from '../graphql/queries';
import { GetZipcodeQuery } from '../graphql/queries';

export const useZipcode = (code: string) => {
  const handleError = useErrorHandler();

  const [loadZipcode, zipcodeResult] = useLazyQuery<GetZipcodeQueryResponse>(GetZipcodeQuery, {
    onError: handleError,
    variables: {
      code,
    },
  });
  const debouncedLoadZipcode = useMemo(() => debounce(500, loadZipcode), [loadZipcode]);

  useEffect(() => {
    if (code == null || code === '') {
      return;
    }

    debouncedLoadZipcode();
  }, [code, debouncedLoadZipcode, loadZipcode]);

  const zipcode = zipcodeResult.data?.zipcode;

  return { zipcode };
};
