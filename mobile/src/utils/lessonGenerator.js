import { VARIETY_QUESTIONS, LEVEL_QUESTIONS } from '../data/medumbaDictionary';

const GOAL_QUESTION_CAP = {
  relaxed: 4,
  normal:  6,
  serious: 8,
  great:   10,
  awesome: Infinity,
};

function pickRandom(pool, n) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

function interleave(arr1, arr2) {
  const out = [];
  const len = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    if (i < arr1.length) out.push(arr1[i]);
    if (i < arr2.length) out.push(arr2[i]);
  }
  return out;
}

export function generateLessonQuestions(lessonId, profile = {}, allQuestions = {}, learnLang = 'medumba') {
  const cap = GOAL_QUESTION_CAP[profile.dailyGoal ?? 'normal'] ?? 6;

  if (learnLang === 'english') {
    const baseQ = allQuestions[lessonId] ?? allQuestions.e2 ?? [];
    return cap === Infinity ? [...baseQ] : baseQ.slice(0, cap);
  }

  const proficiency    = profile.proficiency ?? 1;
  const tileQs         = allQuestions[lessonId] ?? allQuestions.l1 ?? [];
  const levelData      = LEVEL_QUESTIONS?.[lessonId] ?? {};
  const meaningQs      = levelData.meaning ?? [];
  const matchQs        = levelData.match   ?? [];
  const imageVocabPool = (VARIETY_QUESTIONS || []).filter(q => q.type === 'image_vocab');

  let result = [];

  if (proficiency === 1) {
    result = [...pickRandom(imageVocabPool, 2), ...meaningQs];
  } else if (proficiency === 2) {
    const simpleTiles = tileQs.map(q => ({ ...q, bank: q.bank.slice(0, 4) }));
    result = [...pickRandom(imageVocabPool, 1), ...interleave(meaningQs.slice(0, 3), simpleTiles)];
  } else if (proficiency === 3) {
    result = [...pickRandom(imageVocabPool, 1), ...tileQs, ...matchQs];
  } else {
    const meaningPool = (VARIETY_QUESTIONS || []).filter(q => q.type === 'meaning');
    const matchPool   = [...matchQs, ...(VARIETY_QUESTIONS || []).filter(q => q.type === 'match')];
    const varietyItems = [
      ...pickRandom(imageVocabPool, 1),
      ...pickRandom(meaningPool, 1),
      ...pickRandom(matchPool, 1),
    ];
    result = [...tileQs];
    varietyItems.forEach((vq, i) => {
      const pos = Math.min(2 + i * 3, result.length);
      result.splice(pos, 0, vq);
    });
  }

  return cap === Infinity ? result : result.slice(0, cap);
}
