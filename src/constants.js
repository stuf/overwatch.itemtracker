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

export const Color = Object.freeze({
  [Quality.NONE]: 'rgba(0, 0, 0, 0.87)',
  [Quality.COMMON]: 'rgba(0, 0, 0, 0.87)',
  [Quality.RARE]: '#12b9f5',
  [Quality.EPIC]: '#ed3cef',
  [Quality.LEGENDARY]: '#fcb01c'
});
