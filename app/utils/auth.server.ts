import { db } from "~/utils/db.server";
import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";

const sessionSecret = process.env.SESSION_SECRET!;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not set");
}

const authenticator = new Authenticator<any>(sessionStorage);

const formStrategy = new FormStrategy(async ({ form: formData }) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new AuthorizationError("Invalid email or password");
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new AuthorizationError("Invalid email or password");
  }

  return user;
});

authenticator.use(formStrategy, "form");

export { authenticator };
