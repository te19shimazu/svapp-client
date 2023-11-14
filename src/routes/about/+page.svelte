<script>
	import Login from './Login.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Userページ</h1>

	<Login />

	<p>出勤/退勤</p>

	<p>勤怠履歴</p>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling.
		Try using it with JavaScript disabled!
		<a href="/mypage">mypage</a>
	</p>
</div>
