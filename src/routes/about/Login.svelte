<script lang="ts">
	import { signInWithPopup } from 'firebase/auth';
	import { auth, provider } from './firebase';
	import { authStore } from './store';
	import { goto } from '$app/navigation';
	import { getUserByEmail } from '$lib/functions/user';

	async function handleLoginWithGoogle() {
  try {
    const res = await signInWithPopup(auth, provider);
    authStore.set({ ...$authStore, loggedIn: true, user: res.user });

    const result = await getUserByEmail(res.user.email);
    result.length === 0 ? goto('/block') : goto('/mypage');
  } catch (e) {
    goto('/block');
    console.log(e);
  }
}

</script>

<div>
	<button type="button" on:click={handleLoginWithGoogle}> Sign In with Google </button>
</div>

<a href="/block">blockPage</a>
