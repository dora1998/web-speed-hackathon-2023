import { ApolloProvider, SuspenseCache } from '@apollo/client';
import type { FC, ReactNode } from 'react';

import { ModalStateProvider } from '../../../store/modal/context';
import { apolloClient } from '../../../utils//apollo_client';

type Props = {
  children: ReactNode;
};

const suspenseCache = new SuspenseCache();

export const Providers: FC<Props> = ({ children }) => (
  <ApolloProvider client={apolloClient} suspenseCache={suspenseCache}>
    <ModalStateProvider>{children}</ModalStateProvider>
  </ApolloProvider>
);
