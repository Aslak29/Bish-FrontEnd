import React from "react";
import Customer from "./Customer";
import RecentOrders from "./RecentOrders";
import Revenues from "./Revenues";

const View = () => {
  return (
    <div className="flex flex-col m-auto my-10 w-11/12">
      <h4>Dashboard</h4>
      <div className="flex-col">
        <div className="w-full">
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
