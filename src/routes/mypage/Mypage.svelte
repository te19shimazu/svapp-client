<script>
	import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../about/firebase';
	import { onMount } from 'svelte';

	function handleLogout() {
		sessionStorage.clear();
		auth.signOut();
		goto('/');
	}

	function handlePunch() {
		goto('/punch');
	}

	function handleRecord() {
		goto('/record');
	}
	function handleOwner() {
		goto('./ownerpage');
	}
	let user = null;
	let sessionId = null;
	let role;
	async function fetchData() {
		sessionId = sessionStorage.getItem('sessionId');
		if(sessionId == null) goto('./block');
		try {
			const response = await getUserFromSession(sessionId);
			if (response.ok) {
				user = await response.json();
				if (user != null) {
					let url = `https://svapp-server.hinaharu-0014.workers.dev/api/users/${user.email}`;
					let data;

					fetch(url)
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.text();
					})
					.then(html => {
						let userdata = JSON.parse(html);
						role = userdata.role;
					})
					.catch(error => {
							console.error('There was a problem with the fetch operation:', error);
					});
				}else{
					console.log('User is null');
				}
			} else {
				console.error('Failed to fetch user');
			}
		} catch (error) {
			console.error('Error during fetch: ', error);
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
{#if role == 'owner'}
	<button type="button" on:click={handleOwner}>管理者ページ</button>
{/if}