<script>
	import { goto } from '$app/navigation';
	import { auth } from './firebase';
	import { authStore } from './store';

	function handleLogout() {
		auth.signOut();
    goto('/');
	}
</script>

<h1>Login successed.</h1>
{#if $authStore.loggedIn}
	<ul>
		<li>email: {$authStore.user.email}</li>
		<li>name: {$authStore.user.displayName}</li>
	</ul>
	<button type="button" on:click={handleLogout}> Logout </button>
{/if}
