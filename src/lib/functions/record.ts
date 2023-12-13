export async function getRecords(sessionId: string, page: number): Promise<Response> {
  if (!sessionId) {
    return null as unknown as Response;
  }
  if (!page) {
    page = 1;
  }
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/records/${encodeURIComponent(sessionId)}/${page}`);
  return response;
}