
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: "You have successfully logged in",
    })
    setShowWelcome(true)
  }

  const handleContinue = () => {
    setShowWelcome(false)
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Login</Button>
            <div className="text-sm text-center space-y-2">
              <Link to="/auth/forgot-password" className="text-primary hover:underline block">
                Forgot password?
              </Link>
              <span className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Ghar Dhailo! 🎉</DialogTitle>
            <DialogDescription>
              We're excited to have you back. Get ready to explore delicious food and fresh groceries!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleContinue}>Continue to Home</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
