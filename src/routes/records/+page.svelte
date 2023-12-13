<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { getRecords } from '$lib/functions/record';

	let attendanceHistory = [];
	let records = [];
	let pageNumber;
	let salary;

	// ページ番号を取得するための派生ストア
	const pageNumberStore = derived(page, ($page) => {
		const queryParam = $page.url.searchParams.get('page');
		return queryParam ? parseInt(queryParam, 10) : 1;
	});

	// pageNumberStoreを購読して、ページ番号が変更されたときにレコードを取得
	pageNumberStore.subscribe(async (value) => {
		pageNumber = value;

		// セッションIDを取得
		const sessionId = sessionStorage.getItem('sessionId');
		if (!sessionId) {
			alert('セッションIDがありません');
			return;
		}

		// getRecordsを呼び出してレコードを取得
		const response = await getRecords(sessionId, pageNumber);
		attendanceHistory = await response.json();
		records = attendanceHistory.records.results;
		salary = attendanceHistory.salary;
	});
</script>

<main>
	<h1>勤怠履歴</h1>
	{#if salary}
		<p>あなたの時給は{salary}円です。</p>
	{/if}
	<table>
		<thead>
			<tr>
				<th>日付</th>
				<th>出勤</th>
				<th>退勤</th>
			</tr>
		</thead>
		<tbody>
			{#each records as record}
				<tr>
					<td>{record.date}</td>
					<td>{record.time_in}</td>
					<td>{record.time_out}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<div>
		{#if pageNumber > 1}
			<a href="/records?page={pageNumber - 1}">前へ</a>
		{/if}
	</div>
	<div>
		<a href="/records?page={pageNumber + 1}">次へ</a>
	</div>
</main>

<style>
	/* Add your custom styles here */
</style>
