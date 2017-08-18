const freeze = Object.freeze;

export const Filter = freeze({
  NONE: 'none',
  EVENT: 'event',
  HALLOWEEN_2016: 'HALLOWEEN_2016'
});

export const Quality = freeze({
  NONE: 'none',
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary'
});

export const Cost = freeze({
  [Quality.NONE]: 25,
  [Quality.COMMON]: 25,
  [Quality.RARE]: 75,
  [Quality.EPIC]: 250,
  [Quality.LEGENDARY]: 1000
});

export const CostInverse = freeze({
  [Cost.NONE]: Quality.NONE,
  [Cost.COMMON]: Quality.COMMON,
  [Cost.RARE]: Quality.RARE,
  [Cost.EPIC]: Quality.EPIC,
  [Cost.LEGENDARY]: Quality.LEGENDARY
});
