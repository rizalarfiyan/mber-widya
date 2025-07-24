import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useAuth from '@/store/use-auth'
import { useAxios } from '@/utils/axios'
import { apiErrorHandler } from '@/utils/response'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { Eye, EyeOff, KeyRound, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'
import type { IAuthLogin } from '@/types/auth'
import type { BaseResponse } from '@/types/response'

const loginSchema = z.object({
  email: z.string('Invalid email address'),
  password: z.string(),
})

type ILoginSchema = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [login] = useAuth(useShallow(state => [state.login]))
  const navigate = useNavigate()
  const routerState = useRouterState()

  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [{ loading }, action] = useAxios<BaseResponse<IAuthLogin>, ILoginSchema>(
    {
      url: '/auth/login',
      method: 'POST',
    },
    {
      manual: true,
    },
  )

  const [showPassword, setShowPassword] = useState(false)

  const onChangePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword(prev => !prev)
  }

  const onSubmit = async (values: ILoginSchema) => {
    await action({
      data: values,
    })
      .then(async values => {
        form.reset()
        const { user, token } = values.data.data
        await login(user, token)
        navigate({
          to: routerState?.location?.state?.redirectTo ?? '/dashboard',
          replace: true,
        })
      })
      .catch(error => apiErrorHandler(error, form))
  }

  const isDisable = !form.formState.isDirty || !form.formState.isValid

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input leftIcon={User} placeholder="admin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  leftIcon={KeyRound}
                  placeholder="********"
                  type={showPassword ? 'text' : 'password'}
                  rightAction={
                    <Button
                      className="absolute top-2 right-2 size-6"
                      size="icon"
                      type="button"
                      onClick={onChangePassword}>
                      {showPassword ? <EyeOff /> : <Eye />}
                    </Button>
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isFluid disabled={isDisable} isLoading={loading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
