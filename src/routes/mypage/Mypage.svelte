<script>
	import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../about/firebase';
	import { getPunchStatus } from '$lib/functions/punch';
	import { onMount } from 'svelte';

	const sessionId = sessionStorage.getItem('sessionId');

	function handleLogout() {
		sessionStorage.clear();
		auth.signOut();
		goto('/');
	}

	async function handlePunch() {
		const sessionId = sessionStorage.getItem('sessionId');
		if (!sessionId) {
			alert('セッションIDがありません');
			return;
		}
		const res = await getPunchStatus(sessionId);
		if (res.ok) {
			alert(res.status + 'しました：' + res.now);
		} else {
			alert('打刻に失敗しました');
		}
	}

	function handleRecord() {
		goto('/record');
	}

	let user = null;
	async function fetchData() {
		const sessionId = sessionStorage.getItem('sessionId');
		if (sessionId) {
			try {
				const response = await getUserFromSession(sessionId);
				if (response.ok) {
					user = await response.json();
				} else {
					console.error('Failed to fetch user');
				}
			} catch (error) {
				console.error('Error during fetch: ', error);
			}
		} else {
			goto('/block');
		}
	}
	onMount(fetchData);
</script>

<h1>Login successed.</h1>
{#if user != null}
	<ul>
		<li>email: {user.email}</li>
		<li>name: {user.displayName}</li>
	</ul>
	<button type="button" on:click={handleLogout}> ログアウト </button>
	<button type="button" on:click={handlePunch}> 出勤/退勤 </button>
	<button type="button" on:click={handleRecord}> 勤怠履歴 </button>
{/if}