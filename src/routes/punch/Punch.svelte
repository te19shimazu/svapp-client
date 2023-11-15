<script>
	import { goto } from '$app/navigation';
	import { auth } from '../about/firebase';
	import { authStore } from '../about/store';

	function handlePunch() {
		goto('/punch');
	}
</script>

<h2>出勤/退勤</h2>
<ul>
	<button type="button" on:click={handlePunch} />
</ul>
