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
</script>

<h1>congratulation!!</h1>
<center>
<h2>Login successed</h2>
</center>
<button type="button" on:click={handleLogout}> ログアウト </button>
