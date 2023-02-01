import UsernameForm from '../forms/UsernameForm';

export default function SignUpUsername() {
  return (
    <UsernameForm
      formHelperText="People can use your username to search for you."
      submitBtnText="Submit"
    />
  );
}
