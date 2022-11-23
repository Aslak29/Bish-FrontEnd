import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN, ROLE_USER } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/AdminView/AdminHomeView";
import RegisterView from "../views/ClientView/RegisterView";
import HomeView from "../views/ClientView/HomeView";
import LoginView from "../views/ClientView/LoginView";
import { PrivateRoute } from "./PrivateRoute";
import ProductsView from './../views/ClientView/ProductsView';
import ProductView from './../views/ClientView/ProductView';
import BlogView from './../views/ClientView/BlogView';
import BlogArticleView from './../views/ClientView/BlogArticleView';
import ContactView from './../views/ClientView/ContactView';
import PresentationView from './../views/ClientView/PresentationView';
import ShoppingCartView from './../views/ClientView/ShoppingCartView';
import FAQView from './../views/ClientView/FAQView';
import PersonnalInfoView from './../views/ClientView/PersonnalInfoView';
import OrdersView from './../views/ClientView/OrdersView';
import OrderView from './../views/ClientView/OrderView';
import TrackingOrderView from './../views/ClientView/TrackingOrderView';
import AdminCategoriesView from './../views/AdminView/AdminCategoriesView';
import AdminUsersView from './../views/AdminView/AdminUsersView';
import AdminProductsView from './../views/AdminView/AdminProductsView';
import AdminStatsView from './../views/AdminView/AdminStatsView';
import AdminBlogView from './../views/AdminView/AdminBlogView';
import AdminOrdersView from './../views/AdminView/AdminOrdersView';
import AdminContactView from './../views/AdminView/AdminContactView';
import Error404View from './../views/ClientView/Error404View';
import CGUView from './../views/ClientView/CGUView';
import LegalNoticeView from './../views/ClientView/LegalNoticeView';
import ForgotPasswordView from './../views/ClientView/ForgotPasswordView';
import NewPasswordView from './../views/ClientView/NewPasswordView'
import AccountView from './../views/ClientView/AccountView';
/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  return (
    <RoutesContainer>
      <Route path={URL.URL_HOME} element={<HomeView />} />
      <Route
        path={URL.URL_ADMIN_HOME}
        element={
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminHomeView />
          </PrivateRoute>
        }
      />
{/* Routes communes */}
      <Route path={URL.URL_LOGIN} element={<LoginView />} />
      <Route path={URL.URL_REGISTER} element={<RegisterView/>} />
      <Route path={URL.URL_FORGOT_PASSWORD} element={<ForgotPasswordView/>} />
      <Route path={URL.URL_NEW_PASSWORD} element={<NewPasswordView/>} />
      <Route path={URL.URL_PRODUCTS} element={<ProductsView/>} />
      <Route path={URL.URL_PRODUCT} element={<ProductView/>} />
      <Route path={URL.URL_BLOG} element={<BlogView/>} />
      <Route path={URL.URL_BLOG_ARTICLE} element={<BlogArticleView/>} />
      <Route path={URL.URL_CONTACT} element={<ContactView/>} />
      <Route path={URL.URL_PRESENTATION} element={<PresentationView/>} />
      <Route
        path={URL.URL_SHOPPING_CART}
        element={
          <PrivateRoute roles1={[ROLE_ADMIN]} roles2={[ROLE_USER]}>
            <ShoppingCartView/>
          </PrivateRoute>
        }
      />

      <Route path={URL.URL_FAQ} element={<FAQView/>} />
      <Route path='*' element={<Error404View/>} />
      <Route path={URL.URL_CGU} element={<CGUView/>} />
      <Route path={URL.URL_LEGAL_NOTICE} element={<LegalNoticeView/>} />

{/* // Routes client loggé (private Route) */}
      <Route
        path={URL.URL_ACCOUNT}
        element={
          <PrivateRoute roles1={[ROLE_ADMIN]} roles2={[ROLE_USER]}>
            <AccountView />
          </PrivateRoute>
        }
      >
        <Route
        path={URL.URL_INFOS}
        element={
          <PrivateRoute roles1={[ROLE_ADMIN]} roles2={[ROLE_USER]}>
            <PersonnalInfoView/>
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_ORDERS}
        element={
          <PrivateRoute roles1={[ROLE_ADMIN]} roles2={[ROLE_USER]}>
            <OrdersView/>
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_ORDER}
        element={
          <PrivateRoute roles1={[ROLE_ADMIN]} roles2={[ROLE_USER]}>
            <OrderView/>
          </PrivateRoute>
        }
      />
      <Route
        path={URL.URL_TRACKING_ORDER}
        element={
          <PrivateRoute roles1={[ROLE_ADMIN]} roles2={[ROLE_USER]}>
            <TrackingOrderView/>
          </PrivateRoute>
        }
      />

      </Route>

{/* // Routes admin (private) */}
      <Route
        path={URL.URL_ADMIN_HOME}
        element={
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminHomeView />
          </PrivateRoute>
        }
      >
        <Route
          path={URL.URL_ADMIN_CATEGORIES}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminCategoriesView />
            </PrivateRoute>
          }
        />
        <Route
        path={URL.URL_ADMIN_USERS}
        element={
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminUsersView />
          </PrivateRoute>
        }
        />
        <Route
          path={URL.URL_ADMIN_PRODUCTS}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminProductsView />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_ADMIN_STATS}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminStatsView />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_ADMIN_BLOG}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminBlogView/>
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_ADMIN_ORDERS}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminOrdersView/>
            </PrivateRoute>
          }
        />
        <Route
          path={URL.URL_ADMIN_CONTACT}
          element={
            <PrivateRoute roles={[ROLE_ADMIN]}>
              <AdminContactView />
            </PrivateRoute>
          }
        />
      </Route>

    </RoutesContainer>
  );
};

export default Routes;
