/**
 * lessonGenerator.js
 * Generates a personalized question list for a lesson session
 * based on the learner's profile (dailyGoal, goals, proficiency, reason).
 */
import { VARIETY_QUESTIONS } from '../data/medumbaDictionary';

/* ── Max questions per session by daily-goal ─────────────────────── */
const GOAL_QUESTION_CAP = {
    relaxed: 4,
    normal:  6,
    serious: 8,
    great:   10,
    awesome: Infinity,
};

/* ── How many of each variety type to inject, driven by goals ─────── */
function varietyMix(goals = []) {
    let meaning = 1;
    let audio   = 0;
    let match   = 1;
    if (goals.includes('speak')) audio   += 1;  // speaking-focused → more audio
    if (goals.includes('vocab')) { meaning += 1; match += 1; } // vocab → more meaning + match
    // clamp to reasonable amounts
    return { meaning: Math.min(meaning, 3), audio: Math.min(audio, 2), match: Math.min(match, 2) };
}

function pickRandom(pool, n) {
    return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

/**
 * generateLessonQuestions
 *
 * @param {string}  lessonId     - e.g. 'l1', 'e2'
 * @param {object}  profile      - { dailyGoal, goals, proficiency, reason, name }
 * @param {object}  allQuestions - QUESTIONS object from LessonPage (tile-type questions)
 * @param {string}  learnLang    - 'medumba' | 'english'
 * @returns {Array} ordered question list for the session
 */
export function generateLessonQuestions(lessonId, profile = {}, allQuestions = {}, learnLang = 'medumba') {
    const fallbackEn = allQuestions.e2 ?? [];
    const fallbackMd = allQuestions.l1 ?? [];
    const baseQ = allQuestions[lessonId]
        ?? (learnLang === 'english' ? fallbackEn : fallbackMd);

    const cap = GOAL_QUESTION_CAP[profile.dailyGoal ?? 'normal'] ?? 6;

    /* ── English lessons: no variety exercises, just cap the count ── */
    if (learnLang === 'english') {
        return cap === Infinity ? [...baseQ] : baseQ.slice(0, cap);
    }

    /* ── Medumba lessons: build variety pool from learner goals ───── */
    const { meaning: mCount, audio: aCount, match: matchCount } = varietyMix(profile.goals ?? []);

    const meaningPool = VARIETY_QUESTIONS.filter(q => q.type === 'meaning');
    const audioPool   = VARIETY_QUESTIONS.filter(q => q.type === 'audio');
    const matchPool   = VARIETY_QUESTIONS.filter(q => q.type === 'match');

    const varietyItems = [
        ...pickRandom(meaningPool, mCount),
        ...pickRandom(audioPool,   aCount),
        ...pickRandom(matchPool,   matchCount),
    ];

    // Interleave variety questions at positions 2, 5, 8…
    const result = [...baseQ];
    varietyItems.forEach((vq, i) => {
        const pos = Math.min(2 + i * 3, result.length);
        result.splice(pos, 0, vq);
    });

    return cap === Infinity ? result : result.slice(0, cap);
}

/**
 * getPersonalizedTip
 * Returns a short tip/recommendation string based on learner profile.
 */
export function getPersonalizedTip(profile = {}, isFr = false) {
    const { reason, goals = [], dailyGoal } = profile;

    if (reason === 'vacation') {
        return isFr
            ? '✈️ Pour votre voyage : commencez par Salutations et Nourriture !'
            : '✈️ For your trip: start with Greetings and Food!';
    }
    if (reason === 'career') {
        return isFr
            ? '💼 Conseil pro : pratiquez les nombres et le temps chaque jour.'
            : '💼 Pro tip: practice Numbers and Time every day.';
    }
    if (reason === 'education') {
        return isFr
            ? '🎓 Étudiez méthodiquement — corps humain, couleurs, chiffres.'
            : '🎓 Study systematically — Body Parts, Colors, Numbers.';
    }
    if (goals.includes('speak')) {
        return isFr
            ? '💬 Écoutez bien les exercices audio pour améliorer votre prononciation !'
            : '💬 Listen carefully to audio exercises to improve your pronunciation!';
    }
    if (goals.includes('vocab')) {
        return isFr
            ? '📇 Associez les mots pour mémoriser le vocabulaire plus vite !'
            : '📇 Match words to memorize vocabulary faster!';
    }
    if (dailyGoal === 'awesome' || dailyGoal === 'great') {
        return isFr
            ? '🔥 Objectif ambitieux ! Chaque leçon complétée vous rapproche du niveau natif.'
            : '🔥 Ambitious goal! Each lesson brings you closer to native level.';
    }
    return isFr
        ? '⭐ Régularité avant tout — pratiquez un peu chaque jour !'
        : '⭐ Consistency above all — practice a little every day!';
}
