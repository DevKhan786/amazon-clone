import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Page = async () => {
  const session = await auth();
  if (session?.user) return redirect("/");
  return (
    <div className="flex flex-col items-center justify-center py-5 md:py-10 gap-5">
      <div className="bg-gray-100 flex items-center justify-center w-full px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl mb-2">Sign In</CardTitle>
            <CardDescription className="text-sm">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Section */}
            <div className="flex flex-col gap-3 w-full">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
                className="w-full"
              >
                <Button className="w-full gap-2" type="submit">
                  <FcGoogle className="h-5 w-5" />
                  <span>Sign in with Google</span>
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
                className="w-full"
              >
                <Button className="w-full gap-2" type="submit">
                  <Github className="h-5 w-5" />
                  <span>Sign in with GitHub</span>
                </Button>
              </form>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form className="space-y-4 p-4 bg-gray-200/80 rounded-xl">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2 mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                  required
                />
              </div>
              <div className="py-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="border border-black w-full mt-4"
                >
                  Sign In With Email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
