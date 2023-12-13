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
    let user = null;
	let sessionId = null;
	async function fetchData() {
		sessionId = sessionStorage.getItem('sessionId');
		console.log(sessionId);
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
<h1>congratulation!!</h1>
<h2>Login successed</h2>
<button type="button" on:click={handleLogout}> ログアウト </button>
