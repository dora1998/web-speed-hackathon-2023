import { css } from '@emotion/css';
import type { FC } from 'react';
import { lazy } from 'react';
import * as Router from 'react-router-dom';

import { withAuthorized } from '../../../../server/utils/auth';
import { GetProductDetailsQuery } from '../../../graphql/queries';
import { Fallback } from '../../../pages/Fallback';
import { apolloClient } from '../../../utils/apollo_client';
import { Header } from '../../navigators/Header';
import { Layout } from '../Layout';

const NotFound = lazy(() => import('../../../pages/NotFound'));
const Order = lazy(() => import('../../../pages/Order'));
const OrderComplete = lazy(() => import('../../../pages/OrderComplete'));
const ProductDetail = lazy(() => import('../../../pages/ProductDetail'));
const Top = lazy(() => import('../../../pages/Top'));

const productDetailLoader: Router.LoaderFunction = async ({ params }) => {
  try {
    await apolloClient.query({
      query: GetProductDetailsQuery,
      variables: {
        productId: parseInt(params.productId ?? ''),
      },
    });
  } catch (e) {
    throw new Response('Error', { status: 500 });
  }
  return null;
};

const orderLoader: Router.LoaderFunction = withAuthorized(() => null);
const orderCompleteLoader: Router.LoaderFunction = withAuthorized(() => null);

export const container = () => css`
  display: grid;
  height: 50vh;
  place-items: center;
`;

const router = Router.createBrowserRouter(
  Router.createRoutesFromElements(
    <Router.Route
      element={<Layout />}
      errorElement={
        <>
          <Header />
          <main className={container()}>
            <Fallback />
          </main>
        </>
      }
      path="/"
    >
      <Router.Route element={<Top />} path="" />
      <Router.Route element={<ProductDetail />} loader={productDetailLoader} path="product/:productId" />
      <Router.Route element={<Order />} loader={orderLoader} path="order" />
      <Router.Route element={<OrderComplete />} loader={orderCompleteLoader} path="order/complete" />
      <Router.Route element={<NotFound />} path="*" />
    </Router.Route>,
  ),
);

export const Routes: FC = () => {
  return <Router.RouterProvider router={router} />;
};
