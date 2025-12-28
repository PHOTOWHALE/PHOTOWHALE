export const GA_CTA_EVENTS = {
  clickStart: 'click_cta_start',

  clickSelectFrame: 'click_cta_select_frame',
  clickSelectPhoto: 'click_cta_select_photo',
  clickReselectFrame: 'click_cta_reselect_frame',
  clickReStart: 'click_cta_restart',

  clickDownloadPhoto: 'click_cta_download_photo',
  //추후 기능용
  clickSharePhoto: 'click_cta_share_photo',
} as const;

export type GA_CTA_EVENT = (typeof GA_CTA_EVENTS)[keyof typeof GA_CTA_EVENTS];
