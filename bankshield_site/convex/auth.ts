import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { ResendOTP } from "./ResendOTP";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";

const passwordProvider =
  typeof (Password as unknown as (...args: any[]) => any) === "function"
    ? (Password as unknown as (options: any) => any)({
        reset: ResendOTPPasswordReset,
        verify: ResendOTP,
      })
    : Password;

const allowAnonymous = process.env.ALLOW_ANONYMOUS_LOGIN === "true";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: allowAnonymous ? [passwordProvider, Anonymous] : [passwordProvider],
});
