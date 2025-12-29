export const GA_CTA_EVENTS = {
  //랜딩페이지 시작버튼
  clickStart: 'click_cta_start',

  clickSelectFrame: 'click_cta_select_frame',
  clickFinishSelectPhoto: 'click_cta_finish_select_photo',
  clickReselectFrame: 'click_cta_reselect_frame',
  clickReStart: 'click_cta_restart',

  //이미지 저장 버튼
  clickDownloadPhotoSubmit: 'click_cta_download_photo_submit',
  clickDownloadPhotoSuccess: 'click_cta_download_photo_success',
  clickDownloadPhotoFail: 'click_cta_download_photo_fail',

  //문의하기 버튼
  clickContactSubmit: 'click_cta_contact_submit',
  submitContactSuccess: 'submit_contact_success',
  submitContactFail: 'submit_contact_fail',

  //추후 기능용
  clickSharePhoto: 'click_cta_share_photo',
} as const;

export type GA_CTA_EVENT = (typeof GA_CTA_EVENTS)[keyof typeof GA_CTA_EVENTS];
