export const Quality = Object.freeze({
  NONE: 'none',
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary'
});

export const Cost = Object.freeze({
  [Quality.NONE]: 25,
  [Quality.COMMON]: 25,
  [Quality.RARE]: 100,
  [Quality.EPIC]: 250,
  [Quality.LEGENDARY]: 1000
});

export const Strings = Object.freeze({
  COMPLETION_SEPARATOR: ' / '
});
