import React, { useContext, useReducer, useState, useEffect } from 'react';

import * as auth from 'auth/auth.state';
import { Button } from 'ui/form/button';
import { signIn, signUp } from 'api/resource.api';
import USER_TYPE from 'app/app.user-type';
import { AuthContext } from 'auth/auth.context';
import { Input, RadioButton } from 'ui/form/input';
import { ErrorAlert } from 'ui/alert/inline-alert';
import { FlexRow } from 'ui/layout/component/flex';
import { SignupPayload } from 'auth/auth.type';

const handleSignUp = async (
  event: any,
  dispatch: (props: any) => void,
  setSignUpError: (error: string) => void
) => {
  event.preventDefault();
  dispatch({ type: auth.SIGN_IN_PENDING });

  const { data, error } = await signUp(getFormData(event.target));

  if (error) {
    setSignUpError(error.message);
    return dispatch({ type: auth.SIGN_IN_ERROR });
  }

  dispatch({
    type: auth.SIGN_IN_SUCCESS,
    payload: { token: data.token, roles: data.roles },
  });
};

const getFormData = (inputs: any): SignupPayload => {
  const formData: any = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'radio') {
      if (inputs[i].checked) formData[inputs[i].name] = inputs[i].value;
      continue;
    }

    if (inputs[i].name) formData[inputs[i].name] = inputs[i].value;
  }

  return formData;
};

const TutorName = ({ error }: { error: any }) => (
  <>
    <div className="col-md-6 p-0 pr-1">
      <Input
        type="text"
        name="firstName"
        required={true}
        placeholder="First name"
        className={`${error ? 'is-invalid ' : ''}`}
      />
    </div>

    <div className="col-md-6 p-0 pl-1">
      <Input
        type="text"
        name="lastName"
        required={true}
        placeholder="Last name"
        className={`${error ? 'is-invalid ' : ''}`}
      />
    </div>
  </>
);

const InstitutionName = ({ error }: { error: any }) => (
  <div className="col-md-12 p-0 pr-1">
    <Input
      type="text"
      required={true}
      name="institutionName"
      placeholder="Institution Name"
      className={`${error ? 'is-invalid ' : ''}`}
    />
  </div>
);

const SignupForm = () => {
  const [type, setType] = useState<string>(USER_TYPE.TUTOR);
  const [signUpError, setSignUpError] = useState<String>('');
  const { setCurrentAuth, isHandlingAuth } = useContext(AuthContext);
  const [authState, dispatch] = useReducer(auth.reducer, auth.initialState);

  useEffect(() => {
    setCurrentAuth(authState);
  }, [authState, setCurrentAuth]);

  const name =
    USER_TYPE.TUTOR === type ? (
      <TutorName error={signUpError} />
    ) : (
      <InstitutionName error={signUpError} />
    );

  return (
    <form
      className="col-12 p-md-3 p-0"
      onChange={() => setSignUpError('')}
      onSubmit={(e) => handleSignUp(e, dispatch, setSignUpError)}
    >
      <ErrorAlert message={signUpError} />
      <FlexRow>
        <div className="col-md-3 p-0">
          <RadioButton
            name="userType"
            checked={true}
            required={true}
            onChange={setType}
            className="col-md-6"
            id={USER_TYPE.TUTOR}
            value={USER_TYPE.TUTOR}
          />
        </div>
        <div className="col-md-6 p-0">
          <RadioButton
            name="userType"
            required={true}
            onChange={setType}
            id={USER_TYPE.INSTITUTION}
            value={USER_TYPE.INSTITUTION}
          />
        </div>
        {name}
      </FlexRow>

      <Input
        type="email"
        name="email"
        required={true}
        placeholder="Email"
        className={`${signUpError ? 'is-invalid ' : ''}`}
      />
      <Input
        type="password"
        name="password"
        required={true}
        placeholder="Password"
        className={`${signUpError ? 'is-invalid ' : ''}`}
      />
      <p className="small text-muted">
        By signing up you agree to the terms & conditions.
      </p>
      <Button
        name="Register"
        disabled={isHandlingAuth}
        className="md btn-primary"
      />
    </form>
  );
};

export default SignupForm;
