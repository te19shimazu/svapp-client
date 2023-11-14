import type { User } from "firebase/auth";

export async function getUserByEmail(email: string|null): Promise<User> {
  if (!email) {
    return null as unknown as User;
  }
  const response = await fetch(`/api/users/?email=${email}`);
  const userData = await response.json();
  return userData;
}