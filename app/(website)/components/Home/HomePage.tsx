import  LoginForm  from "@/components/auth/LoginForm"

export const instant = false

function HomePage() {
  return (
    <div>
      <LoginForm redirectTo="#home"/>
    </div>
  )
}
export default HomePage