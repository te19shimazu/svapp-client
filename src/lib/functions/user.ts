import type { User } from "firebase/auth";

export async function getUserByEmail(email: string | null): Promise<User> {
  if (!email) {
    return null as unknown as User;
  }
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/users/${encodeURIComponent(email)}`);
  const userData = await response.json();
  return userData;
}