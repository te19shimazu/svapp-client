<script>
	import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../firebase';
	import { getPunchStatus } from '$lib/functions/punch';
	import { onMount } from 'svelte';


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
		goto('/records');
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
<div>
<button type="button" on:click={handleLogout}> ログアウト </button>
<button type="button" on:click={handlePunch}> 出勤/退勤 </button>
<button type="button" on:click={handleRecord}> 勤怠履歴 </button>
</div>
{/if}
{#if role == 'owner'}
<div class="ownerbutton">
	<button type="button" on:click={handleOwner} class="ownerpage">管理者ページ</button>
</div>
{/if}
<style>
	div{
		display:flex;
		justify-content: space-between;
	}
	.ownerbutton{
		justify-content: center;
		display:flex;
	}
	.ownerpage{
		width:200px;
		height:100px;
		border-radius:30px;
	}
</style>