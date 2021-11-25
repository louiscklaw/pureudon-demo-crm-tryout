import React from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import NavCollapseMenu from './NavCollapseMenu';

const NavItemDigest = ({ item }) => {
  if (item?.sub_items) return <NavCollapseMenu {...item} />;

  return <NavItem {...item} />;
};

NavItemDigest.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItemDigest;
