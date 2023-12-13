<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { getRecords } from '$lib/functions/record';

	let attendanceHistory = null;

	onMount(async () => {
		// ページ番号を取得するための派生ストアを作成
		const pageNumber = derived(page, ($page) => {
			// URLのクエリパラメータから 'page' パラメータを取得
			const queryParam = $page.url.searchParams.get('page');
			// パラメータが存在しない場合は1ページ目とする
			return queryParam ? parseInt(queryParam, 10) : 1;
		});
		const sessionId = sessionStorage.getItem('sessionId');
		if (!sessionId) {
			alert('セッションIDがありません');
			return;
		}
		const response = await getRecords(sessionId, Number(pageNumber));
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
	</table>
</main>

<style>
	/* Add your custom styles here */
</style>
