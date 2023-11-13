<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let message = '';
  let userId = '';

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        message = 'ユーザーが削除されました。';
      } else {
        message = 'ユーザーの削除に失敗しました。';
      }
    } catch (error) {
      message = 'エラーが発生しました。';
    }
  };

  onMount(() => {
    dispatch('title', { title: 'ユーザー削除' });
  });
</script>

<main>
  <h1>ユーザーIDを入力してください</h1>
  <input type="text" bind:value={userId} />
  <button on:click={handleDelete}>削除</button>
  <h2>{message}</h2>
</main>
