<script>
	import Login from './Login.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	<h1>Userページ</h1>

	<Login />
	<a href="/mypage">mypage</a>
</div>
<style>
a{
	background-color: skyblue;
	padding: 10px;
	border-radius: 5px;
	color:blue;
	font-family: sans-serif;
}
</style>