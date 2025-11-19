<script lang="ts">
  import { onDestroy } from 'svelte';
  import ConsonantChart from '$lib/components/ConsonantChart.svelte';
  import VowelChart from '$lib/components/VowelChart.svelte';
  import { consonantReference, languages, vowelReference, type Language } from '$lib/data/ipa';
  import { getGraphemeAnchorId, getGraphemeKey } from '$lib/utils/grapheme';

  type ColoredLanguage = Language & { color: string };

  const palette = ['#2563eb', '#f97316', '#10b981', '#7c3aed', '#ef4444'];
  const displayLanguages: ColoredLanguage[] = languages.map((language, index) => ({
    ...language,
    color: palette[index % palette.length]
  }));

  const hasRules = displayLanguages.some((language) => language.rules?.length);
  const highlightTimers = new Map<string, ReturnType<typeof setTimeout>>();

  const highlightAlphabet = (languageId: string, grapheme: string) => {
    if (typeof document === 'undefined') {
      return;
    }

    const key = getGraphemeKey(languageId, grapheme);
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(`[data-grapheme-key="${key}"]`)
    );

    if (targets.length === 0) {
      return;
    }

    const anchorId = getGraphemeAnchorId(languageId, grapheme);
    const primaryTarget = targets.find((target) => target.id === anchorId) ?? targets[0];
    primaryTarget.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    targets.forEach((target) => target.classList.add('entry__grapheme--highlight'));

    const existingTimer = highlightTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = window.setTimeout(() => {
      targets.forEach((target) => target.classList.remove('entry__grapheme--highlight'));
      highlightTimers.delete(key);
    }, 1800);

    highlightTimers.set(key, timer);
  };

  const handleAlphabetClick = (event: MouseEvent, languageId: string, grapheme: string) => {
    event.preventDefault();
    highlightAlphabet(languageId, grapheme);
  };

  onDestroy(() => {
    highlightTimers.forEach((timer) => clearTimeout(timer));
    highlightTimers.clear();
  });
</script>

<svelte:head>
  <title>Multilingual IPA chart</title>
  <meta
    name="description"
    content="Compare consonant and vowel inventories for Indonesian, Korean, and Arabic on a shared IPA chart."
  />
</svelte:head>

<main class="page">
  <section class="intro">
    <p class="eyebrow">Phonology reference</p>
    <h1>International Phonetic Alphabet across languages</h1>
    <p class="lead">
      Explore how multiple languages map onto the standard IPA grid. Each cell shows the canonical
      IPA placeholder alongside the phonemes attested in Indonesian, Korean, and Arabic.
    </p>
  </section>

  <section class="legend">
    <h2>Language key</h2>
    <ul>
      {#each displayLanguages as language}
        <li style={`--lang-color: ${language.color}`}>
          <span class="swatch" aria-hidden="true"></span>
          <div class="legend__copy">
            <p class="legend__name">
              {language.name}
              <span class="legend__meta">({language.variety})</span>
            </p>
            <p class="legend__details">
              {language.script} script • {language.id.toUpperCase()}
            </p>
            {#if language.notes}
              <p class="legend__notes">{language.notes}</p>
            {/if}
            {#if language.alphabet?.length}
              <div class="legend__alphabet">
                <p class="legend__alphabet-label">Alphabet</p>
                <div class="legend__alphabet-rail">
                  <ul class="legend__alphabet-list">
                    {#each language.alphabet as symbol}
                      <li>
                        <a
                          class="legend__alphabet-link"
                          href={`#${getGraphemeAnchorId(language.id, symbol)}`}
                          on:click|preventDefault={(event) =>
                            handleAlphabetClick(event, language.id, symbol)}
                          aria-label={`Highlight ${language.name} letter ${symbol}`}
                        >
                          {symbol}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  </section>

  <ConsonantChart languages={displayLanguages} reference={consonantReference} />

  <VowelChart languages={displayLanguages} reference={vowelReference} />

  {#if hasRules}
    <section class="rules">
      <h2>Notable realisations</h2>
      <div class="rules__grid">
        {#each displayLanguages as language}
          {#if language.rules?.length}
            <article class="rule-card" style={`--lang-color: ${language.color}`}>
              <h3>{language.name}</h3>
              <ul>
                {#each language.rules as rule}
                  <li>
                    <p class="rule__name">{rule.name}</p>
                    <p class="rule__details">
                      /{rule.phoneme}/ →
                      {rule.realizations
                        .map((realization) => `${realization.ipa} (${realization.environment})`)
                        .join('; ')}
                    </p>
                  </li>
                {/each}
              </ul>
            </article>
          {/if}
        {/each}
      </div>
    </section>
  {/if}
</main>

<footer class="footer">
  <small>&copy; {new Date().getFullYear()} Multilingual IPA Chart</small>
</footer>

<style>
  :global(body) {
    background: linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%);
    color: #0f172a;
  }

  .page {
    padding: clamp(1.5rem, 4vw, 3rem);
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(2rem, 5vw, 3rem);
  }

  .intro {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 56rem;
  }

  .eyebrow {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 600;
    color: #2563eb;
    margin: 0;
  }

  h1 {
    font-size: clamp(2.2rem, 6vw, 3.5rem);
    line-height: 1.1;
    margin: 0;
  }

  .lead {
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0;
    color: rgba(15, 23, 42, 0.78);
  }

  .legend {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .legend h2 {
    margin: 0;
    font-size: clamp(1.4rem, 3.5vw, 2rem);
  }

  .legend ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .legend li {
    display: flex;
    gap: 0.5rem;
    padding: 0.65rem 0.85rem;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    border-left: 4px solid var(--lang-color);
    align-items: flex-start;
  }

  .swatch {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.5rem;
    background: var(--lang-color);
    flex-shrink: 0;
    opacity: 0.9;
  }

  .legend__name {
    margin: 0;
    font-weight: 600;
    font-size: 1.05rem;
  }

  .legend__meta {
    font-weight: 400;
    font-size: 0.9rem;
    color: rgba(15, 23, 42, 0.65);
    margin-left: 0.35rem;
  }

  .legend__details {
    margin: 0.25rem 0 0;
    font-size: 0.9rem;
    color: rgba(30, 41, 59, 0.75);
  }

  .legend__notes {
    margin: 0.35rem 0 0;
    font-size: 0.85rem;
    color: rgba(30, 41, 59, 0.7);
  }

  .legend__alphabet {
    margin-top: 0.45rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .legend__alphabet-label {
    margin: 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(15, 23, 42, 0.5);
  }

  .legend__alphabet-rail {
    overflow-x: auto;
    padding-bottom: 0.15rem;
  }

  .legend__alphabet-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.3rem;
    align-items: center;
  }

  .legend__alphabet-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 0.4rem;
    border-radius: 0.35rem;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(37, 99, 235, 0.08);
    font-size: 0.95rem;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
    transition:
      background 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease;
  }

  .legend__alphabet-link:hover,
  .legend__alphabet-link:focus-visible {
    background: rgba(250, 204, 21, 0.45);
    color: #1f2937;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.4);
  }

  .rules {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .rules h2 {
    margin: 0;
    font-size: clamp(1.4rem, 3.5vw, 2rem);
  }

  .rules__grid {
    display: grid;
    gap: 1rem;
  }

  .rule-card {
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(148, 163, 184, 0.35);
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
  }

  .rule-card h3 {
    margin: 0 0 0.5rem;
    color: var(--lang-color);
    font-size: 1.1rem;
  }

  .rule-card ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rule__name {
    margin: 0;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .rule__details {
    margin: 0.1rem 0 0;
    font-size: 0.9rem;
    color: rgba(30, 41, 59, 0.75);
  }

  .footer {
    padding: 1.5rem clamp(1.5rem, 4vw, 3rem);
    text-align: center;
    color: rgba(15, 23, 42, 0.6);
  }

  @media (min-width: 48rem) {
    .rules__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 64rem) {
    .rules__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
