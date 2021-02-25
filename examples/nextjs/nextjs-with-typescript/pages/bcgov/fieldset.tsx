import React, { useState } from 'react';
import Fieldset from 'component-library-bcgov/Fieldset';
import Input from 'component-library-bcgov/Input';
import BCGovTypography from '../../components/BCGovTypography';

export default function FieldsetPage() {
  return (
    <>
      <BCGovTypography />
      <Fieldset title="Form" size="small">
        <Input label="Address" />
      </Fieldset>

      <Fieldset title="Form">
        <Input label="Address" />
      </Fieldset>

      <Fieldset title="Form" size="large">
        <Input label="Address" />
      </Fieldset>
    </>
  );
}
