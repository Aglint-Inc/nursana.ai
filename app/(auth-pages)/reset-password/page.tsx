import { resetPasswordAction } from "app/actions";

import Footer from "@/components/footer";
import { FormMessage, type Message } from "@/components/form-message";
import NursanaLogo from "@/components/nursana-logo";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="p-4 max-w-xl w-full mx-auto min-h-screen flex flex-col justify-between items-center">
 <NursanaLogo/>
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <div className="flex flex-col items-center mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      </div>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
    <Footer/>
    </div>
  );
}
