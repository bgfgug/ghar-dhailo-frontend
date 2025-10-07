
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, isLoading, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password, 'user');
    
    if (success) {
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      setShowWelcome(true);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleContinue = () => {
    setShowWelcome(false);
    // Navigate to the intended route or home
    const from = location.state?.from?.pathname || '/home';
    navigate(from, { replace: true });
  };

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
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button 
                  type="button" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="mr-2" size={16} />
                  Login
                </span>
              )}
            </Button>
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
            <div className="relative pt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs text-muted-foreground">
                <span className="bg-background px-2">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Button variant="outline" onClick={() => navigate('/admin/login')} type="button">
                <Lock className="mr-2" size={16} />
                Admin Login
              </Button>
              <Button variant="outline" onClick={() => navigate('/driver/login')} type="button">
                <Lock className="mr-2" size={16} />
                Driver Login
              </Button>
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
