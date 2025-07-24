import LoginForm from './form'
import Title from '@/layouts/auth/title'

const LoginPage = () => (
  <Title title="Login to your account" description="Please enter your credentials to access your account.">
    <LoginForm />
  </Title>
)

export default LoginPage
