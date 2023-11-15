<script lang="ts">
	import { signInWithPopup } from 'firebase/auth';
	import { auth, provider } from './firebase';
	import { authStore } from './store';
	import { goto } from '$app/navigation';
	import { getUserByEmail, saveUserToSession } from '$lib/functions/user';

	async function handleLoginWithGoogle() {
		try {
			const res = await signInWithPopup(auth, provider);
			authStore.set({ ...$authStore, loggedIn: true, user: res.user });

			const result = await getUserByEmail(res.user.email);
			if (result) {
        console.log("authStore.user = " + JSON.stringify($authStore.user));
				const response = await saveUserToSession($authStore.user);
        console.log("response = " + JSON.stringify(response));
				const sessionData = await response.json();
        console.log("sessionData = " + JSON.stringify(sessionData));
				const session_id = sessionData.session_id;
				goto('/mypage');
				sessionStorage.setItem('sessionId', session_id);
        console.log("session_id = " + session_id);
			} else {
				sessionStorage.clear();
				goto('/block');
			}
		} catch (e) {
			goto('/block');
			console.log(e);
			sessionStorage.clear();
		}
	}
</script>

<div>
	<button type="button" on:click={handleLoginWithGoogle}> Sign In with Google </button>
</div>

<a href="/block">blockPage</a>
