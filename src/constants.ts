const { MODE, SITE } = import.meta.env;

export const BASE_URL = MODE === 'development' ? 'http://localhost:4321' : SITE;
