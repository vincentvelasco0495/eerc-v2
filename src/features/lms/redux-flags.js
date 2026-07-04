export const LMS_REDUX_FLAGS = {
  readByRedux: true,
  writeByRedux: true,
  endpointReads: {
    '/api/user': true,
    '/api/meta': true,
    '/api/programs': true,
    '/api/programs/*/stats': true,
    '/api/batch-enrolls': true,
    '/api/learning-modes': true,
    '/api/branch-enrolls': true,
    '/api/review-schedules': true,
    '/api/honor-award-discounts': true,
    '/api/package-enrolls': true,
    '/api/instructors': true,
    '/api/instructors/linkable-users': true,
    '/api/students': true,
    '/api/students/linkable-users': true,
    '/api/courses': true,
    '/api/courses/*/detail': true,
    '/api/courses/*/stats': true,
    '/api/modules': true,
    '/api/quizzes': true,
    '/api/quiz-results': true,
    '/api/assignment-summaries': true,
    '/api/quiz-summaries': true,
    '/api/gradebook/courses': true,
    '/api/gradebook/courses/*': true,
    '/api/my-assignments': true,
    '/api/my-quizzes': true,
    '/api/assignments/*/students': true,
    '/api/assignments/*/leaderboard': true,
    '/api/quizzes/*/students': true,
    '/api/quizzes/*/leaderboard': true,
    '/api/courses/*/lesson-progress': true,
    '/api/analytics': true,
    '/api/leaderboard': true,
    '/api/enrollments': true,
    '/api/enrollments/enrolled-courses': true,
    '/api/enrollment-payments': true,
    '/api/admin': true,
  },
};

export function shouldUseReduxRead(endpoint) {
  if (!LMS_REDUX_FLAGS.readByRedux) return false;
  if (!endpoint) return false;
  const normalized = String(endpoint).trim();
  if (!normalized) return false;
  const map = LMS_REDUX_FLAGS.endpointReads;
  if (map[normalized]) return true;
  if (/^\/api\/programs(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/programs']);
  }
  if (/^\/api\/batch-enrolls(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/batch-enrolls']);
  }
  if (/^\/api\/learning-modes(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/learning-modes']);
  }
  if (/^\/api\/branch-enrolls(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/branch-enrolls']);
  }
  if (/^\/api\/review-schedules(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/review-schedules']);
  }
  if (/^\/api\/honor-award-discounts(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/honor-award-discounts']);
  }
  if (/^\/api\/package-enrolls(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/package-enrolls']);
  }
  if (/^\/api\/instructors(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/instructors']);
  }
  if (/^\/api\/students(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/students']);
  }
  if (normalized === '/api/enrollments/enrolled-courses' || normalized.startsWith('/api/enrollments/enrolled-courses#')) {
    return Boolean(map['/api/enrollments/enrolled-courses']);
  }
  if (/^\/api\/enrollments(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/enrollments']);
  }
  if (/^\/api\/enrollment-payments(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/enrollment-payments']);
  }
  if (normalized.startsWith('/api/programs/') && normalized.endsWith('/stats')) {
    return Boolean(map['/api/programs/*/stats']);
  }
  if (normalized.startsWith('/api/courses/') && normalized.endsWith('/stats')) {
    return Boolean(map['/api/courses/*/stats']);
  }
  if (normalized.startsWith('/api/courses/') && normalized.endsWith('/detail')) {
    return Boolean(map['/api/courses/*/detail']);
  }
  if (normalized.startsWith('/api/courses/') && normalized.endsWith('/lesson-progress')) {
    return Boolean(map['/api/courses/*/lesson-progress']);
  }
  if (normalized.startsWith('/api/leaderboard')) return Boolean(map['/api/leaderboard']);
  if (normalized.startsWith('/api/courses')) return Boolean(map['/api/courses']);
  if (normalized.startsWith('/api/modules')) return Boolean(map['/api/modules']);
  if (normalized.startsWith('/api/quizzes')) return Boolean(map['/api/quizzes']);
  if (/^\/api\/assignments\/[^/]+\/students(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/assignments/*/students']);
  }
  if (/^\/api\/assignments\/[^/]+\/leaderboard(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/assignments/*/leaderboard']);
  }
  if (/^\/api\/quiz-summaries(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/quiz-summaries']);
  }
  if (/^\/api\/quizzes\/[^/]+\/students(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/quizzes/*/students']);
  }
  if (/^\/api\/quizzes\/[^/]+\/leaderboard(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/quizzes/*/leaderboard']);
  }
  if (/^\/api\/my-assignments(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/my-assignments']);
  }
  if (/^\/api\/my-quizzes(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/my-quizzes']);
  }
  if (normalized === '/api/gradebook/courses') {
    return Boolean(map['/api/gradebook/courses']);
  }
  if (/^\/api\/gradebook\/courses\/[^/?]+(\?.*)?$/.test(normalized)) {
    return Boolean(map['/api/gradebook/courses/*']);
  }
  return false;
}
