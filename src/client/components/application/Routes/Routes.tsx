import type { FC } from 'react';
import { lazy } from 'react';
import * as Router from 'react-router-dom';

import { withAuthorized } from '../../../../server/utils/auth';
import { GetProductDetailsQuery } from '../../../graphql/queries';
import { apolloClient } from '../../../utils/apollo_client';
import { Layout } from '../Layout';

const NotFound = lazy(() => import('../../../pages/NotFound'));
const Order = lazy(() => import('../../../pages/Order'));
const OrderComplete = lazy(() => import('../../../pages/OrderComplete'));
const ProductDetail = lazy(() => import('../../../pages/ProductDetail'));
const Top = lazy(() => import('../../../pages/Top'));

const productDetailLoader: Router.LoaderFunction = async ({ params }) => {
  await apolloClient.query({
    query: GetProductDetailsQuery,
    variables: {
      productId: parseInt(params.productId ?? ''),
    },
  });
  return null;
};

const orderLoader: Router.LoaderFunction = withAuthorized(() => null);
const orderCompleteLoader: Router.LoaderFunction = withAuthorized(() => null);

const router = Router.createBrowserRouter(
  Router.createRoutesFromElements(
    <Router.Route element={<Layout />} path="/">
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
