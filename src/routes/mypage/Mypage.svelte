<script>
	import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../about/firebase';
	import { getPunchStatus } from '$lib/functions/punch';
	import { onMount } from 'svelte';

	function handleLogout() {
		auth.signOut();
		goto('/');
	}

	async function handlePunch() {
		const sessionId = sessionStorage.getItem('sessionId');
		console.log(sessionId + 'を送信します');
		const res = await getPunchStatus(sessionId);
		console.log(res);
		if (res.ok) {
			alert(res.status + 'しました：' + res.now);
		} else {
			alert('打刻に失敗しました');
		}
		console.log('打刻しました');
	}

	function handleRecord() {
		goto('/record');
	}

	let user = null;
	const sessionId = sessionStorage.getItem('sessionId');
	async function fetchData() {
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
		<li>sessionId: {sessionId}</li>
	</ul>
	<button type="button" on:click={handleLogout}> ログアウト </button>
	<button type="button" on:click={handlePunch}> 出勤/退勤 </button>
	<button type="button" on:click={handleRecord}> 勤怠履歴 </button>
{/if}
