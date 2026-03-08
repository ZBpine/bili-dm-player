const URL_RULES_KEY = 'urlRules';

const DEFAULT_URL_RULES = [
  {
    id: 'youtube-watch',
    name: 'YouTube watch',
    enabled: true,
    urlMatch: 'https://www.youtube.com/watch*',
    extractRegex: '[?&]v=([^&]+)',
    urlTemplate: 'https://www.youtube.com/watch?v={{ID}}',
    titleExtractRegex: ' - YouTube$',
  },
  {
    id: 'bilibili-video',
    name: 'Bilibili video',
    enabled: true,
    urlMatch: 'https://www.bilibili.com/video/*',
    extractRegex: '/video/(BV[0-9A-Za-z]+)',
    urlTemplate: 'https://www.bilibili.com/video/{{ID}}',
    titleExtractRegex: '_哔哩哔哩_bilibili$',
  },
  {
    id: 'bilibili-watchlater',
    name: 'Bilibili watchlater',
    enabled: true,
    urlMatch: 'https://www.bilibili.com/list/watchlater*',
    extractRegex: '[?&]bvid=(BV[0-9A-Za-z]+)',
    urlTemplate: 'https://www.bilibili.com/video/{{ID}}',
    titleExtractRegex: '-[^-]+-稍后再看-哔哩哔哩视频$',
  },
];

function cloneDefaultUrlRules() {
  return DEFAULT_URL_RULES.map((rule, index) => ({ ...rule, order: index }));
}

function wildcardToRegExp(pattern) {
  const escaped = String(pattern || '')
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`, 'i');
}

function sanitizeUrlRule(rule, fallbackIndex) {
  return {
    id: String(rule?.id || `rule-${Date.now()}-${fallbackIndex}`),
    name: String(rule?.name || `规则${fallbackIndex + 1}`),
    enabled: rule?.enabled !== false,
    urlMatch: String(rule?.urlMatch || '').trim(),
    extractRegex: String(rule?.extractRegex || ''),
    urlTemplate: String(rule?.urlTemplate || '{{ID}}'),
    titleExtractRegex: String(rule?.titleExtractRegex || ''),
    order: Number.isFinite(Number(rule?.order)) ? Number(rule.order) : fallbackIndex,
  };
}

function applyIdTemplate(template, videoId) {
  const text = String(template || '{{ID}}').trim();
  if (text === '*') return String(videoId || '');
  return text
    .replaceAll('{{ID}}', videoId)
    .replaceAll('{{id}}', videoId)
    .replaceAll('*', videoId);
}

function applyTitleTemplate(titleText, rule) {
  const raw = String(titleText || '');
  const pattern = String(rule?.titleExtractRegex || '').trim();
  if (!pattern) return raw.trim();
  try {
    const regex = new RegExp(pattern);
    return raw.replace(regex, '').trim();
  } catch {
    return raw.trim();
  }
}

function ensure() {
  const saved = GM_getValue(URL_RULES_KEY, null);
  if (!Array.isArray(saved)) {
    GM_setValue(URL_RULES_KEY, cloneDefaultUrlRules());
  }
}

function getUrlRules() {
  ensure();
  const saved = GM_getValue(URL_RULES_KEY, []);
  if (!Array.isArray(saved)) return cloneDefaultUrlRules();
  return saved.map((rule, index) => sanitizeUrlRule(rule, index));
}

function saveUrlRules(rules) {
  const next = Array.isArray(rules) ? rules.map((rule, index) => sanitizeUrlRule(rule, index)) : [];
  GM_setValue(URL_RULES_KEY, next);
}

function getDefaultUrlRules() {
  return cloneDefaultUrlRules();
}

function testUrlRule(rule, urlText = location.href) {
  try {
    if (rule.urlMatch) {
      const urlRegex = wildcardToRegExp(rule.urlMatch);
      if (!urlRegex.test(urlText)) return null;
    } else {
      return null;
    }

    const extractRegex = rule.extractRegex ? new RegExp(rule.extractRegex) : null;
    const match = extractRegex ? urlText.match(extractRegex) : null;
    const videoId = match?.[1] || match?.[0] || null;
    const normalizedUrl = videoId ? applyIdTemplate(rule.urlTemplate, videoId) : urlText;

    return {
      videoId,
      normalizedUrl,
    };
  } catch {
    return null;
  }
}

function matchCurrentUrlRule(urlText = location.href) {
  const rules = getUrlRules();
  for (const rule of rules) {
    if (!rule.enabled) continue;
    const matched = testUrlRule(rule, urlText);
    if (!matched) continue;
    return {
      rule,
      ...matched,
    };
  }
  return null;
}

export const urlRules = {
  ensure,
  get: getUrlRules,
  save: saveUrlRules,
  getDefault: getDefaultUrlRules,
  test: testUrlRule,
  applyTitle: applyTitleTemplate,
  matchCurrent: matchCurrentUrlRule,
};
