<script lang="ts">
  import {
    consonantManners,
    consonantMannerLabels,
    consonantPlaceLabels,
    consonantPlaces,
    consonantReference,
    isConsonant,
    type ConsonantManner,
    type ConsonantPhoneme,
    type ConsonantPlace,
    type ConsonantReference,
    type Language
  } from '$lib/data/ipa';

  type ColoredLanguage = Language & { color: string };

  interface CellLanguage {
    language: ColoredLanguage;
    entries: ConsonantPhoneme[];
  }

  interface Cell {
    manner: ConsonantManner;
    place: ConsonantPlace;
    placeholder: string[];
    items: CellLanguage[];
  }

  export let languages: ColoredLanguage[] = [];
  export let reference: ConsonantReference = consonantReference;

  let rows: Cell[][] = [];

  $: rows = consonantManners.map((manner) =>
    consonantPlaces.map((place) => {
      const placeholder = reference[manner]?.[place] ?? [];
      const items = languages
        .map((language) => {
          const entries = language.phonemes
            .filter(isConsonant)
            .filter((phoneme) => phoneme.manner === manner && phoneme.place === place);

          return entries.length > 0 ? { language, entries } : null;
        })
        .filter((entry): entry is CellLanguage => Boolean(entry));

      return { manner, place, placeholder, items } satisfies Cell;
    })
  );

  const gridTemplate = `minmax(7rem, 9rem) repeat(${consonantPlaces.length}, minmax(8rem, 1fr))`;
</script>

<section class="chart">
  <header class="chart__header">
    <h2>Consonant chart</h2>
    <p>Rows show manner of articulation; columns show place of articulation.</p>
  </header>

  <div class="chart__scroll">
    <div class="chart__grid" style={`grid-template-columns: ${gridTemplate};`}>
      <div class="cell cell--heading cell--blank" aria-hidden="true"></div>
      {#each consonantPlaces as place}
        <div class="cell cell--heading cell--place">{consonantPlaceLabels[place]}</div>
      {/each}

      {#each rows as row}
        <div class="cell cell--heading cell--manner">
          {consonantMannerLabels[row[0].manner]}
        </div>
        {#each row as cell}
          <div class="cell" data-place={cell.place} data-manner={cell.manner}>
            {#if cell.placeholder.length}
              <div class="cell__placeholder" aria-hidden="true">
                {cell.placeholder.join(' · ')}
              </div>
            {/if}

            {#if cell.items.length > 0}
              <ul class="cell__entries">
                {#each cell.items as entry}
                  <li class="entry" style={`--lang-color: ${entry.language.color}`}>
                    <span class="entry__tag">{entry.language.id.toUpperCase()}</span>
                    <span class="entry__ipa">
                      {entry.entries.map((phoneme) => phoneme.ipa).join(', ')}
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
    min-width: 48rem;
  }

  .cell {
    border: 1px solid rgba(148, 163, 184, 0.4);
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    background: rgba(255, 255, 255, 0.95);
    min-height: 5.5rem;
  }

  .cell--heading {
    background: rgba(37, 99, 235, 0.08);
    border-bottom: 1px solid rgba(148, 163, 184, 0.4);
    font-weight: 600;
    justify-content: center;
    color: #1e293b;
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
    font-size: 0.75rem;
    color: rgba(100, 116, 139, 0.9);
    font-style: italic;
    letter-spacing: 0.03em;
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
    border-left: 3px solid var(--lang-color, rgba(37, 99, 235, 0.6));
    padding-left: 0.5rem;
  }

  .entry__tag {
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: var(--lang-color, #1d4ed8);
    text-transform: uppercase;
  }

  .entry__ipa {
    font-size: 1rem;
    font-family: 'Noto Sans', 'Charis SIL', 'Gentium Plus', system-ui, sans-serif;
  }

  .cell__empty {
    font-size: 0.9rem;
    color: rgba(148, 163, 184, 0.9);
  }

  @media (min-width: 64rem) {
    .cell {
      min-height: 6.25rem;
    }
  }
</style>
