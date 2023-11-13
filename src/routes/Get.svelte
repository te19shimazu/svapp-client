<script>
	let responseText = '';

	async function sendGetRequest() {
		const response = await fetch('https://8c41e01c.svapp.pages.dev/api/users/example');
		responseText = await response.text();
	}
</script>

<button on:click={sendGetRequest}>Getリクエストを送信</button>

<p>{responseText}</p>
