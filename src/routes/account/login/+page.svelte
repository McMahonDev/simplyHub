<script lang="ts">
    import { enhance } from '$app/forms';

    let formLogin = true;
    let formRegister = false;
    let formForgot = false;
</script>

<section>
    {#if formLogin}
        <h1>Login</h1>
        <form use:enhance method="POST" action="?/login">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    {/if}

    {#if formRegister}
        <h1>Register</h1>
        <form use:enhance method="POST" action="?/createAccount">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
            <button type="submit">Register</button>
        </form>
    {/if}

    {#if formForgot}
        <h1>Forgot Password</h1>
        <form use:enhance method="POST" action="?/forgot">
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Send Reset Link</button>
        </form>
    {/if}
    <button on:click={() => { formLogin = true; formRegister = false; formForgot = false; }}>Login</button>
    <button on:click={() => { formLogin = false; formRegister = true; formForgot = false; }}>Register</button>
    <button on:click={() => { formLogin = false; formRegister = false; formForgot = true; }}>Forgot Password</button>
    <button on:click={() => { formLogin = false; formRegister = false; formForgot = false; }}>Back</button>
</section>