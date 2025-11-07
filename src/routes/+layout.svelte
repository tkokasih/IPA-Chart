<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { assets } from '$app/paths';

  let { children } = $props();
  const iconHref = `${assets}/icons/icon.svg`;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="apple-touch-icon" href={iconHref} />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="mobile-web-app-capable" content="yes" />
</svelte:head>

<div class="app-shell">
  {@render children()}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family:
      'Inter',
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      sans-serif;
    color: #0f172a;
    background: #f1f5f9;
  }

  :global(a) {
    color: inherit;
  }

  .app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
