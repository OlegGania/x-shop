import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { signIn } from '@/features/auth/api/authApi';
import { notify } from '@/services/notify';
import LoginForm from '@/features/auth/ui/LoginForm/LoginForm';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from: string = location.state?.from?.pathname ?? '/';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({ mode: 'onBlur' });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginFormValues) => signIn(email, password),

    onSuccess: () => navigate(from, { replace: true }),

    onError: (error: Error) => {
      const message = error.message.toLowerCase();

      if (message.includes('invalid') || message.includes('credentials')) {
        setError('password', { type: 'server', message: 'Invalid email or password' });
        return;
      }

      notify.error('Login failed. Please try again later.');
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate({
      email: values.email.trim(),
      password: values.password.trim(),
    });
  };

  return (
    <LoginForm
      register={register}
      errors={errors}
      isPending={loginMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginPage;
