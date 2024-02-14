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
		goto('../adduser');
	}
</script>
<div>
<button type="button" on:click={handleAdd}>ユーザー追加</button>
<button type="button" on:click={handleLogout}> ログアウト </button>
</div>
<style>
div{
	display: flex;
	justify-content: space-around;
}
</style>