<script>
	import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../about/firebase';
	import { onMount } from 'svelte';
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
	onMount(async () => {
		if (sessionId) {
			try {
				const response = await getUserFromSession(sessionId);
				if (response.ok) {
					const userDataString = await response.text(); // 最初のレスポンスをテキストとして取得
					const userDataObject = JSON.parse(userDataString); // テキストをオブジェクトに変換
					user = JSON.parse(userDataObject); // オブジェクトがまだ文字列の場合、もう一度解析
					console.log('typeof = ' + typeof user); // これで "object" となるはず
					console.log('user email = ' + user.email);
				} else {
					console.error('Failed to fetch user');
				}
			} catch (error) {
				console.error('Error during fetch: ', error);
			}
		} else {
			goto('/block');
		}
	});
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
