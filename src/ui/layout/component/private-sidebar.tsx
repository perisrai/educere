import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Flex } from './flex';
import { history } from 'app/app.history';
import { ROUTE } from 'app/app.route-path';

interface TabProps {
  name: String;
  icon?: String;
  route?: string;
  children?: ReactNode;
}

const sidebarMenu = {
  TAB: 'tab',
  SUB_TAB: 'sub_tab',
  ACTIVE_SUB_TAB: '',
  ACTIVE_TAB: 'Dashboard',

  setActiveTab(tab: string, type: string) {
    if (this.TAB === type) return (this.ACTIVE_TAB = tab);

    return (this.ACTIVE_SUB_TAB = tab);
  },

  isActive(tab: string, type: string) {
    if (this.TAB === type) return this.ACTIVE_TAB === tab;

    return this.ACTIVE_SUB_TAB === tab;
  },
};

const redirectTo = (route: string = '/') => history.push(route);

const generateIdFromName = (name: String) => name.split(' ').join('-');

const handleRoute = (route: string = '', tabId: string, type: string) => {
  if (route) redirectTo(route);
  sidebarMenu.setActiveTab(tabId, type);
};

const Tab = ({ name, icon, route, children }: TabProps) => {
  const tabId = generateIdFromName(name);

  return (
    <div className="tab">
      <input
        id={tabId}
        type="radio"
        name="main-menu"
        className="tab-input"
        checked={sidebarMenu.isActive(tabId, sidebarMenu.TAB)}
        onChange={() => handleRoute(route, tabId, sidebarMenu.TAB)}
      />
      <label className="tab-label" htmlFor={tabId}>
        <span className="shake p">
          <i className={`icon ion-${icon} p mr-3 m-0 d-inline-block`} />
          {name}
        </span>
        {children && (
          <i className="icon ion-ios-arrow-forward ml-2 arrow float-right" />
        )}
      </label>
      <div className="tab-content">{children}</div>
    </div>
  );
};

const SubTab = ({ name, icon = 'ios-arrow-forward', route }: TabProps) => {
  const subTabId = generateIdFromName(name);

  return (
    <div className="sub-tab">
      <input
        type="radio"
        id={subTabId}
        name="sub-menu"
        className="sub-tab-input"
        checked={sidebarMenu.isActive(subTabId, sidebarMenu.SUB_TAB)}
        onChange={() => handleRoute(route, subTabId, sidebarMenu.SUB_TAB)}
      />
      <label className="sub-tab-label" htmlFor={subTabId}>
        <span className="p pt-0 pl-3 small shake">
          <i className={`icon ion-${icon} p mr-3 m-0 d-inline-block`} />
          {name}
        </span>
      </label>
    </div>
  );
};

const SidebarAccordinMenu = () => (
  <div className="tabs">
    <Tab name="Dashboard" icon="ios-home" route={ROUTE.DASHBOARD} />
    <Tab name="Availability" icon="md-time" route={ROUTE.ADD_AVAILABILITY} />
    <Tab
      name="Appointments"
      icon="md-calendar"
      route={ROUTE.TUTOR_APPOINMENTS}
    />

    <Tab name="Settings" icon="md-construct" route={ROUTE.DASHBOARD} />
  </div>
);

const SidebarProfile = () => (
  <div className="col-12">
    <div className="sidebar-dp text-center">
      {true ? (
        <img
          src="https://avatars0.githubusercontent.com/u/18304391?s=460&u=b8a8e241f410db24197bd5f8fd3131e31d272ac7&v=4"
          alt="dp"
        />
      ) : (
        <i className="icon ion-md-contact text-center  mr-2 m-0 text-muted" />
      )}
    </div>
    <div className="pl-4">
      <h3 className="mb-0">Akash Rai</h3>
      <p>akasky70@gmail.com</p>
      <p>I love EduCere.</p>
      <div className="text-left small">
        <p className="m-0">
          <i className="icon ion-md-call mr-2" />
          9869768601
        </p>
        <Flex>
          <i className="icon ion-md-pin mr-2" />
          <div>
            <p className="m-0">Bouddha Rd, Jorpati</p>
            <p className="m-0">Kathmandu, Nepal</p>
            <p className="m-0">44600</p>
          </div>
        </Flex>
      </div>

      <Link className="col-12 btn btn-md btn-outline-primary mt-3 p-1">
        Edit Profile
      </Link>
    </div>
  </div>
);

const PrivateSidebar = () => {
  return (
    <section className="col-md-3">
      <div className="col-md-12 p-0 pt-3 pb-3 bg-transparent text-primary sidebar p-sticky">
        {/* <SidebarAccordinMenu /> */}
        <SidebarProfile />
      </div>
    </section>
  );
};

export default PrivateSidebar;
