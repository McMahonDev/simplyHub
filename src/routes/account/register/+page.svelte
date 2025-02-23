<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<section>
	<h1>Register</h1>
	<form use:enhance method="POST" action="?/createAccount">
		<input type="email" name="email" placeholder="Email" required />
		<input type="password" name="password" placeholder="Password" required />
		<input type="password" name="confirmPassword" placeholder="Confirm Password" required />
		<button type="submit">Register</button>
	</form>
</section>
