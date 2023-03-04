import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import type { GetUserAuthQueryResponse } from '../../client/graphql/queries';
import { GetAuthUserQuery } from '../../client/graphql/queries';
import { apolloClient } from '../../client/utils/apollo_client';

export const withAuthorized = (fn: LoaderFunction) => async (params: LoaderFunctionArgs) => {
  const authUserResult = await apolloClient.query<GetUserAuthQueryResponse>({ query: GetAuthUserQuery });

  const authUser = authUserResult.data?.me;
  const isAuthUser = !!authUser;

  if (!isAuthUser) {
    return redirect('/');
  }

  return fn(params);
};
