"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(pathname);
  return (
    <>
      <div className="dashboard-nav dashboard_row">
        <div className="dashboard-inner">
          <ul>
            <li className="active">
              <Link href="/dashboard">
                <i className="flaticon-dashboard"></i> Dashboard
              </Link>
            </li>
            {session?.user?.role === "admin" && (
              <li className={pathname === "/dashboard/users" ? "active" : ""}>
                <Link href="/dashboard/users">
                  <i className="flaticon-calendar"></i> Users
                </Link>
              </li>
            )}
            {session?.user?.role === "admin" && (
              <li
                className={
                  pathname === "/dashboard/customer-service" ? "active" : ""
                }
              >
                <Link href="/dashboard/customer-service">
                  <i className="flaticon-calendar"></i> Customer Service
                </Link>
              </li>
            )}
            {session?.user?.role === "admin" && (
              <li
                className={
                  pathname === "/dashboard/create-customer" ? "active" : ""
                }
              >
                <Link href="/dashboard/create-customer">
                  <i className="flaticon-calendar"></i> Create Customer
                </Link>
              </li>
            )}
          </ul>
          <h4>Task Management</h4>
          <ul>
            <li
              className={pathname === "/dashboard/manage-tasks" ? "active" : ""}
            >
              <Link href="/dashboard/manage-tasks">
                <i className="flaticon-mail-1"></i> Manage Tasks{" "}
                {/* <span className="nav-tag">6</span> */}
              </Link>
            </li>
          </ul>
          <h4>Account</h4>
          <ul>
            {/* <li className={pathname === "/dashboard-profile" ? "active" : ""}>
              <Link href="/dashboard-profile">
                <i className="flaticon-male"></i> Restaurant Profile
              </Link>
            </li> */}
            {session?.user?.role === "admin" && (
              <li
                className={
                  pathname === "/dashboard/payment-method" ? "active" : ""
                }
              >
                <Link href="/dashboard/payment-method">
                  <i className="flaticon-list-1"></i> Payment Method
                </Link>
              </li>
            )}

            <li>
              <Link href="#" onClick={signOut}>
                <i className="flaticon-logout"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
