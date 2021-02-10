import React from 'react';
import { createStyleBuilder, createBootstrap } from './helpers';

interface Props {
  id?: string;
  name?: string;
  label?: string;
  children?: any;
  defaultValue?: string;
  disabled?: boolean;
}

export const applyTheme = (styles, config) => {
  const styleBuilder = createStyleBuilder(styles, config);
  const Scontainer = styleBuilder('div', 'container');
  const Slabel = styleBuilder('label', 'label');
  const Sinput = styleBuilder('input', 'input');

  const bootstrap = createBootstrap(styles, 'filepicker');

  const BaseComponent = (props: Props) => {
    const { id, name, label, ariaLabel, styleProps, rest } = bootstrap(props);

    return (
      <Scontainer {...styleProps}>
        {label && (
          <Slabel htmlFor={id} {...styleProps}>
            {label}
          </Slabel>
        )}
        <Sinput aria-label={ariaLabel} {...rest} type="file" id={id} name={name} />
      </Scontainer>
    );
  };

  return BaseComponent;
};

const FilePicker = applyTheme({}, {});

export default FilePicker;