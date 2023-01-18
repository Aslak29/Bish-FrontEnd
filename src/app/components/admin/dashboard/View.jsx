import React from "react";
import Customer from "./Customer";
import RecentOrders from "./RecentOrders";
import Revenues from "./Revenues";
import TitleContainer from '../../../components/admin/TitleContainer';

const View = () => {
  return (
    <div className="flex flex-col m-auto my-10 w-11/12">
      <TitleContainer name="DASHBOARD" addButton={false} />
      <div className="flex-col">
        <div className="w-full my-10">
          <Revenues />
        </div>
        <div className="w-full flex">
        <RecentOrders/>
        <Customer/>
        </div>
        
      </div>
    </div>
  );
};

export default View;
