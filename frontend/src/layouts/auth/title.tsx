import Logo from '@/components/logo'

type TitleProps = React.PropsWithChildren & {
  title: string
  description: string
}

const Title = ({ title, description, children }: TitleProps) => (
  <div className="w-full max-w-md space-y-10 px-4 sm:px-0">
    <div className="space-y-8 text-center">
      <Logo className="mx-auto h-16 w-auto text-white lg:hidden dark:text-white" />
      <div className="space-y-3">
        <h2 className="text-4xl font-bold tracking-tight lg:text-4xl">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
    {children}
  </div>
)

export default Title
