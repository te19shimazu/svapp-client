
export async function sendPunchRequest(sessionId: string): Promise<{ ok: boolean, now: string, status: string }> {
  const url = 'https://svapp-server.hinaharu-0014.workers.dev/api/punch';
  const body = { "sessionId": sessionId };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const c = await response.json();
  if (!c.ok) {
    throw new Error(c.message);
  } else if (c.time_in) {
    return { ok: true, now: c.time_in, status: '出勤' };
  } else if (c.time_out) {
    return { ok: true, now: c.time_out, status: '退勤' };
  } else {
    return { ok: false, now: c.message, status: 'エラー' };
  }
}
