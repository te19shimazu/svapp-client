import type { RequestHandler } from "@sveltejs/kit";

// ユーザーの取得 (Read)
export const GET: RequestHandler = async ({ request, platform, params }) => {
  const { id } = params;
  const result = await platform.env.DB.prepare(
    "SELECT * FROM users WHERE id = ?"
  ).bind(id).all();
  return new Response(JSON.stringify(result));
};

// ユーザーの作成 (Create)
export const POST: RequestHandler = async ({ request, platform }) => {
  const userData = await request.json();
  await platform.env.DB.prepare(
    "INSERT INTO users (name, email) VALUES (?, ?)"
  ).bind(userData.name, userData.email).run();
  return new Response(JSON.stringify({ message: 'User created successfully' }));
};

// ユーザーの更新 (Update)
export const PUT: RequestHandler = async ({ request, platform, params }) => {
  const { id } = params;
  const updateData = await request.json();
  await platform.env.DB.prepare(
    "UPDATE users SET name = ?, email = ? WHERE id = ?"
  ).bind(updateData.name, updateData.email, id).run();
  return new Response(JSON.stringify({ message: 'User updated successfully' }));
};

// ユーザーの削除 (Delete)
export const DELETE: RequestHandler = async ({ request, platform, params }) => {
  const { id } = params;
  await platform.env.DB.prepare(
    "DELETE FROM users WHERE id = ?"
  ).bind(id).run();
  return new Response(JSON.stringify({ message: 'User deleted successfully' }));
};
