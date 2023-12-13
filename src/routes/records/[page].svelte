<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { getRecords } from '$lib/functions/record';

  let attendanceHistory = null;
  let currentPage = 1;

  onMount(async () => {
    currentPage = Number(get(page).params.page) || 1;
    const sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      alert('セッションIDがありません');
      return;
    }
    const response = await getRecords(sessionId, currentPage);
    attendanceHistory = await response.json();
  });
</script>

<main>
  <h1>勤怠履歴</h1>
  <table>
    <thead>
      <tr>
        <th>日付</th>
        <th>出勤</th>
        <th>退勤</th>
      </tr>
    </thead>
    <tbody>
      {#each attendanceHistory.result as attendance}
        <tr>
          <td>{attendance.date}</td>
          <td>{attendance.time_in}</td>
          <td>{attendance.time_out}</td>
        </tr>
      {/each}
    </tbody>
</main>

<style>
  /* Add your custom styles here */
</style>
