
<script>
  let username = '';
  let password = '';

  async function handleSubmit() {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      alert('User registered successfully!');
    } else {
      alert('Error registering user.');
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Username:
    <input type="text" bind:value={username} />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} />
  </label>
  <button type="submit">Register</button>
</form>
