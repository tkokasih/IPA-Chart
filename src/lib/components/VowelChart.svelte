<script lang="ts">
  import {
    isVowel,
    vowelBacknessLabels,
    vowelBacknesses,
    vowelHeightLabels,
    vowelHeights,
    vowelReference,
    type Language,
    type PhonemeBase,
    type VowelBackness,
    type VowelHeight,
    type VowelPhoneme,
    type VowelReference
  } from '$lib/data/ipa';
  import { getGraphemeAnchorId, getGraphemeKey } from '$lib/utils/grapheme';

  type ColoredLanguage = Language & { color: string };

  interface VowelCellEntry {
    language: ColoredLanguage;
    unrounded: VowelPhoneme[];
    rounded: VowelPhoneme[];
    unroundedTokens: GraphemeToken[];
    roundedTokens: GraphemeToken[];
  }

  interface VowelCell {
    height: VowelHeight;
    backness: VowelBackness;
    placeholder?: { unrounded?: string; rounded?: string };
    entries: VowelCellEntry[];
  }

  interface GraphemeToken {
    label: string;
    key?: string;
    anchorId?: string;
  }

  export let languages: ColoredLanguage[] = [];
  export let reference: VowelReference = vowelReference;

  let rows: VowelCell[][] = [];
  let claimedGraphemeAnchors = new Set<string>();

  const buildTokens = <T extends PhonemeBase>(
    language: ColoredLanguage,
    phonemes: T[]
  ): GraphemeToken[] =>
    phonemes.flatMap((phoneme) => {
      if (phoneme.graphemes?.length) {
        return phoneme.graphemes.map((grapheme) => {
          const key = getGraphemeKey(language.id, grapheme);

          if (claimedGraphemeAnchors.has(key)) {
            return { label: grapheme, key } satisfies GraphemeToken;
          }

          claimedGraphemeAnchors.add(key);
          return {
            label: grapheme,
            key,
            anchorId: getGraphemeAnchorId(language.id, grapheme)
          } satisfies GraphemeToken;
        });
      }

      return [{ label: phoneme.ipa } satisfies GraphemeToken];
    });

  $: {
    claimedGraphemeAnchors = new Set();
    rows = vowelHeights.map((height) =>
      vowelBacknesses.map((backness) => {
        const placeholder = reference[height]?.[backness];
        const entries = languages
          .map((language) => {
            const vowels = language.phonemes
              .filter(isVowel)
              .filter((phoneme) => phoneme.height === height && phoneme.backness === backness);

            if (vowels.length === 0) {
              return null;
            }

            const unrounded = vowels.filter((item) => item.rounding === 'unrounded');
            const rounded = vowels.filter((item) => item.rounding === 'rounded');

            return {
              language,
              unrounded,
              rounded,
              unroundedTokens: buildTokens(language, unrounded),
              roundedTokens: buildTokens(language, rounded)
            } satisfies VowelCellEntry;
          })
          .filter((value): value is VowelCellEntry => Boolean(value));

        return { height, backness, placeholder, entries } satisfies VowelCell;
      })
    );
  }

  const gridTemplate = `minmax(7rem, 9rem) repeat(${vowelBacknesses.length}, minmax(8rem, 1fr))`;
</script>

<section class="chart">
  <header class="chart__header">
    <h2>Vowel chart</h2>
    <p>Rows represent vowel height; columns represent vowel backness.</p>
  </header>

  <div class="chart__scroll">
    <div class="chart__grid" style={`grid-template-columns: ${gridTemplate};`}>
      <div class="cell cell--heading cell--blank" aria-hidden="true"></div>
      {#each vowelBacknesses as backness}
        <div class="cell cell--heading cell--place">{vowelBacknessLabels[backness]}</div>
      {/each}

      {#each rows as row}
        <div class="cell cell--heading cell--manner">{vowelHeightLabels[row[0].height]}</div>
        {#each row as cell}
          <div class="cell" data-height={cell.height} data-backness={cell.backness}>
            {#if cell.placeholder?.unrounded || cell.placeholder?.rounded}
              <div class="cell__placeholder" aria-hidden="true">
                <span>{cell.placeholder?.unrounded ?? '—'}</span>
                <span>{cell.placeholder?.rounded ?? ''}</span>
              </div>
            {/if}

            {#if cell.entries.length > 0}
              <ul class="cell__entries">
                {#each cell.entries as entry}
                  <li class="entry" style={`--lang-color: ${entry.language.color}`}>
                    <span class="entry__tag">{entry.language.id.toUpperCase()}</span>
                    <span class="entry__ipa">
                      {#if entry.unroundedTokens.length}
                        <span class="entry__group">
                          {#each entry.unroundedTokens as token, index}
                            {#if index > 0}
                              <span aria-hidden="true" class="entry__separator">, </span>
                            {/if}
                            {#if token.key}
                              <span
                                class="entry__grapheme"
                                data-grapheme-key={token.key}
                                id={token.anchorId}
                                tabindex="-1"
                              >
                                {token.label}
                              </span>
                            {:else}
                              <span>{token.label}</span>
                            {/if}
                          {/each}
                        </span>
                      {/if}
                      {#if entry.unroundedTokens.length && entry.roundedTokens.length}
                        <span aria-hidden="true" class="entry__divider">•</span>
                      {/if}
                      {#if entry.roundedTokens.length}
                        <span class="entry__group">
                          {#each entry.roundedTokens as token, index}
                            {#if index > 0}
                              <span aria-hidden="true" class="entry__separator">, </span>
                            {/if}
                            {#if token.key}
                              <span
                                class="entry__grapheme"
                                data-grapheme-key={token.key}
                                id={token.anchorId}
                                tabindex="-1"
                              >
                                {token.label}
                              </span>
                            {:else}
                              <span>{token.label}</span>
                            {/if}
                          {/each}
                        </span>
                      {/if}
                    </span>
                  </li>
                {/each}
              </ul>
            {:else}
              <span class="cell__empty" aria-hidden="true">—</span>
            {/if}
          </div>
        {/each}
      {/each}
    </div>
  </div>
</section>

<style>
  .chart {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chart__header h2 {
    margin: 0;
    font-size: clamp(1.5rem, 4vw, 2.25rem);
  }

  .chart__header p {
    margin: 0;
    color: rgba(15, 23, 42, 0.7);
    font-size: 0.95rem;
  }

  .chart__scroll {
    border: 1px solid rgba(148, 163, 184, 0.4);
    border-radius: 1rem;
    overflow-x: auto;
    background: rgba(248, 250, 252, 0.8);
  }

  .chart__grid {
    display: grid;
    min-width: 40rem;
  }

  .cell {
    border: 1px solid rgba(148, 163, 184, 0.4);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    background: rgba(255, 255, 255, 0.95);
    min-height: 5rem;
  }

  .cell--heading {
    background: rgba(2, 132, 199, 0.08);
    border-bottom: 1px solid rgba(148, 163, 184, 0.4);
    font-weight: 600;
    justify-content: center;
    color: #0f172a;
  }

  .cell--place {
    text-align: center;
    font-size: 0.9rem;
  }

  .cell--manner {
    position: sticky;
    left: 0;
    z-index: 1;
    min-width: 7rem;
  }

  .cell--blank {
    position: sticky;
    left: 0;
    z-index: 2;
  }

  .cell__placeholder {
    display: flex;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: rgba(100, 116, 139, 0.9);
    font-style: italic;
  }

  .cell__entries {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .entry {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    border-left: 3px solid var(--lang-color, rgba(2, 132, 199, 0.6));
    padding-left: 0.5rem;
  }

  .entry__tag {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: var(--lang-color, #0284c7);
    text-transform: uppercase;
  }

  .entry__ipa {
    font-size: 1rem;
    font-family: 'Noto Sans', 'Charis SIL', 'Gentium Plus', system-ui, sans-serif;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .entry__group {
    display: inline-flex;
    gap: 0.25rem;
  }

  .entry__separator {
    color: rgba(15, 23, 42, 0.55);
  }

  .entry__divider {
    padding: 0 0.25rem;
    color: rgba(15, 23, 42, 0.55);
  }

  .entry__grapheme {
    border-radius: 0.35rem;
    padding: 0.1rem 0.35rem;
    background: rgba(2, 132, 199, 0.08);
    transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
  }

  :global(.entry__grapheme--highlight) {
    background: rgba(250, 204, 21, 0.45);
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.5);
  }

  .cell__empty {
    font-size: 0.9rem;
    color: rgba(148, 163, 184, 0.9);
  }

  @media (min-width: 64rem) {
    .cell {
      min-height: 5.75rem;
    }
  }
</style>
