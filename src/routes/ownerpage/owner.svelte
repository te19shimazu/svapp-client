<script>
    import { goto } from '$app/navigation';
	import { getUserFromSession } from '$lib/functions/user';
	import { auth } from '../firebase';
	import { onMount } from 'svelte';

    function handleLogout() {
		sessionStorage.clear();
		auth.signOut();
		goto('/');
	}
	function handleAdd(){
		console.log('User add');
	}
</script>
<center>
<h1>congratulation!!!</h1>
<h3>Login successed!</h3>
</center>
<button type="button" on:click={handleLogout}> ログアウト </button>
<button type="button" on:click={handleAdd}>ユーザー追加</button>
