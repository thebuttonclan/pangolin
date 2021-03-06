import React, { useContext } from 'react';
import cx from 'clsx';
import styled from 'styled-components';
import { processStyle, createStyleBuilder, createBootstrap, StyleConfig as BaseStyleConfig } from './helpers';

export interface Props {
  id?: string;
  children?: React.ReactNode;
  className?: string;
  style?: object;
  [key: string]: any;
}

interface Context {
  styleProps: object;
  Sgroup: any;
  Sitem: any;
}

interface BreakingProps {
  readonly collapse?: string;
  readonly expanse?: string;
}

const CONTAINER_CLASS = 'pg-menu-container';
const GROUP_CLASS = 'pg-menu-group';
const ITEM_CLASS = 'pg-menu-item';

const initialContext: Context = {
  styleProps: {},
  Sgroup: null,
  Sitem: null,
};

const collapseFn = props =>
  props.collapse
    ? `@media (max-width: ${props.collapse}px) {
      display: none !important;
    }`
    : '';

const expandFn = props =>
  props.expand
    ? `
    @media (min-width: ${props.expand}px) {
        display: none !important;
      }`
    : '';

const createBreakingGroup = tag => {
  return styled[tag]<BreakingProps>`
    display: flex;
    ${collapseFn}
    ${expandFn}
  `;
};

const createBreakingItem = tag => {
  return styled[tag]<BreakingProps>`
    ${collapseFn}
    ${expandFn}
  `;
};

const MenuContext = React.createContext(initialContext);

export interface StyleConfig {
  defaultProps?: object;
  staticProps?: string[];
  breakProps?: string[];
  as?: object;
}

export const applyTheme = (styles, config: BaseStyleConfig) => {
  const processedStyle = processStyle(styles);
  const styleBuilder = createStyleBuilder(processedStyle, config);

  const as = config.as || {};
  const Scontainer = styleBuilder(createBreakingGroup(as.container || 'nav'), 'container');
  const Sgroup = styleBuilder(createBreakingGroup(as.group || 'div'), 'group');
  const Sitem = styleBuilder(createBreakingItem(as.item || 'span'), 'item');

  const bootstrap = createBootstrap(processedStyle, 'menu');

  const BaseComponent = (props: Props) => {
    const { id, name, label, ariaLabel, styleProps, children, className, rest } = bootstrap(props);
    const { collapse, expand, ...others } = rest;

    return (
      <MenuContext.Provider value={{ styleProps, Sgroup, Sitem }}>
        <Scontainer
          collapse={collapse || ''}
          expand={expand || ''}
          {...others}
          className={cx(CONTAINER_CLASS, className)}
        >
          {children}
        </Scontainer>
      </MenuContext.Provider>
    );
  };

  BaseComponent.Group = props => {
    const { children, className, collapse, expand, ...rest } = props;
    const classes = cx(GROUP_CLASS, className);
    const { Sgroup, styleProps } = useContext(MenuContext);

    return (
      <Sgroup className={classes} collapse={collapse || ''} expand={expand || ''} {...styleProps} {...rest}>
        {children}
      </Sgroup>
    );
  };

  BaseComponent.Item = props => {
    const { children, className, collapse, expand, ...rest } = props;
    const classes = cx(ITEM_CLASS, className);
    const { Sitem, styleProps } = useContext(MenuContext);

    return (
      <Sitem className={classes} collapse={collapse || ''} expand={expand || ''} {...styleProps} {...rest}>
        {children}
      </Sitem>
    );
  };

  return BaseComponent;
};

const Menu = applyTheme({}, {});

export default Menu;
