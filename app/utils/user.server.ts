import bcrypt from "bcryptjs";
import { db } from "./db.server";
import type { RegisterForm } from "./types.server";

export async function createUser(data: RegisterForm) {
  const password = await bcrypt.hash(data.password, 10);
  const newUser = await db.user.create({
    data: {
      email: data.email,
      password: password,
      name: data.name,
    },
  });
  return { id: newUser.id, email: data.email, name: data.name };
}
