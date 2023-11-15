<script>
	import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../about/firebase';
	import { authStore } from '../about/store';

	function handleLogout() {
		auth.signOut();
		goto('/');
	}

	function handlePunch() {
		goto('/punch');
	}

	function handleRecord() {
		goto('/record');
	}

	let user = null;
	const sessionId = sessionStorage.getItem('sessionId');
	if (sessionId) {
		console.log("sessionId1 = " + sessionId);
		user = getUserFromSession(sessionId);
		console.log("user = " + JSON.stringify(user));
	} else {
		goto('/block');
	}
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
