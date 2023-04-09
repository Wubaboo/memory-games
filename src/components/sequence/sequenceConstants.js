export const KEYCODE_A = 65;
export const KEYCODE_LEFT = 37;
export const KEYCODE_RIGHT = 39;
export const KEYCODE_D = 68;
export const KEYCODE_ZERO = 48;
export const KEYCODE_NINE = 57;
export const KEYCODE_BACKSPACE = 8;

export const MILLISECONDS_IN_SECOND = 1000;

export const MIN_TIME_LIMIT = 15;
export const MAX_DIGITS_PER_SECOND = 3;

// Controls rate limit. 'Keyup' events
// occuring within KEY_REPEAT ms of the
// previous are ignored.
export const KEY_REPEAT = 40;

// How many cells shown to the far right when scrolling.
export const SCROLL_OFF = 3;
export const RIGHT_SCROLL = -1;
export const LEFT_SCROLL = 1;

// How many digits of context are given to the
// incorrect portion of the answer.
export const REPORT_WINDOW = 3;
