import type { User, UserInfo } from "firebase/auth";

export async function getUserByEmail(email: string | null): Promise<User> {
  if (!email) {
    return null as unknown as User;
  }
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/users/${encodeURIComponent(email)}`);
  const userData = await response.json();
  return userData;
}

export async function saveUserToSession(user: UserInfo): Promise<Response> {
  if (!user) {
    return null as unknown as Response;
  }
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to save user to session");
  }
  return response;
}

export async function getUserFromSession(sessionId: string): Promise<JSON> {
  console.log(encodeURIComponent(sessionId));
  console.log("fetch = " + await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/session/${encodeURIComponent(sessionId)}`));
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/session/${encodeURIComponent(sessionId)}`)
  try {
    const userData = await response.json();
    console.log("userData = " + userData);
    return userData;
  }
  catch (error) {
    console.error(error);
    return null as unknown as JSON;
  }
}

export async function deleteUserFromSession(sessionId: string): Promise<Response> {
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/session/${encodeURIComponent(sessionId)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete user from session");
  }
  return response;
}
