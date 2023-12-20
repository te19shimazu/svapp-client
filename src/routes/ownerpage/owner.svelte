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
	function handleAdd(){
		goto('./mypage');
	}
</script>
<center>
<h1>congratulation!!!</h1>
<h3>Login successed!</h3>
</center>
<form action="" method="post" name="add">

    <label for="name">名前:</label>
    <input type="text" id="name" name="name" required>

    <br>

    <label for="email">メールアドレス:</label>
    <input type="email" id="email" name="email" required>

    <br>

    <label for="position">役職:</label>
    <select id="position" name="position" required>
      <option value="" disabled selected>選択してください</option>
      <option value="owner">管理者</option>
	    <option value="maneger">マネージャー</option>
	    <option value="parttime">パート</option>
	    <option value="others">一般人</option>
    </select>

    <br>

    <button type="submit">従業員登録</button>

  </form>

  <button type="button" on:click={handleLogout}> ログアウト </button>