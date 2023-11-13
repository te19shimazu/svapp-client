
<script>
  let email = '';
  let password = '';
  let confirmPassword = '';

  function handleSubmit() {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Send form data to server
    console.log('Email:', email);
    console.log('Password:', password);
  }
</script>

<h1>Sign Up</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>

  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>

  <label>
    Confirm Password:
    <input type="password" bind:value={confirmPassword} required />
  </label>

  <button type="submit">Sign Up</button>
</form>
