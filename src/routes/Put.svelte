
<script>
  let userId = "";
  let name = "";
  let email = "";

  const handleSubmit = async () => {
    const res = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    if (res.ok) {
      alert("User information updated successfully!");
    } else {
      alert("Failed to update user information.");
    }
  };
</script>

<h1>Update User Information</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    User ID:
    <input type="text" bind:value={userId} />
  </label>
  <label>
    Name:
    <input type="text" bind:value={name} />
  </label>
  <label>
    Email:
    <input type="email" bind:value={email} />
  </label>
  <button type="submit">Update User</button>
</form>
