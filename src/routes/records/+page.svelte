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
		<p class="salaryprice">時給:{salary}円</p>
	{/if}
	<div class="tablepage">
	<table border="2">
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
	</div>
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
.salaryprice{
	font-size:20px;
}
.tablepage{
	display: flex;
	justify-content: center;
}
table{
	background-color: pink;
	font-size:30px;
	margin: 100px;
	width:800px;
	border-collapse: collapse; border-color: rgb(0, 137, 190);
}
a{
	background-color: skyblue;
	padding: 10px;
	border-radius: 5px;
	color:blue;
}
</style>
