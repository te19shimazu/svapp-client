export async function getPunchStatus(sessionId: string): Promise<{ ok: boolean, now: string, status: string }> {
  const response = await fetch(`https://svapp-server.hinaharu-0014.workers.dev/api/punch/${encodeURIComponent(sessionId)}`);
  const c = await response.json();
  if (c.time_in) {
    return { ok: true, now: c.time_in, status: '出勤' };
  } else if (c.time_out) {
    return { ok: true, now: c.time_out, status: '退勤' };
  } else {
    return { ok: false, now: '存在しません', status: 'エラー' };
  }
}
