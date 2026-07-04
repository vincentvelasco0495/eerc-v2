import { getLearnerEnrollmentAccessSets } from 'src/features/student-profile/student-profile-data';

import { normalizeUserRole } from 'src/auth/utils/role';

// ----------------------------------------------------------------------

/** True when the signed-in learner may open lessons/quizzes for this course. */
export function learnerCanAccessCourseLessons({
  authenticated = false,
  role = '',
  programId = '',
  enrollments = [],
  course = null,
} = {}) {
  if (!authenticated) {
    return false;
  }

  const normalizedRole = normalizeUserRole(role);
  if (normalizedRole === 'admin' || normalizedRole === 'instructor') {
    return true;
  }

  if (typeof course?.canAccessLessons === 'boolean') {
    return course.canAccessLessons;
  }

  const { approvedCourseIds, legacyApprovedProgramIds } = getLearnerEnrollmentAccessSets(enrollments);

  const courseId = typeof course?.id === 'string' ? course.id : '';
  if (courseId && approvedCourseIds.has(courseId)) {
    return true;
  }

  const resolvedProgramId =
    programId || (typeof course?.programId === 'string' ? course.programId : '');

  if (resolvedProgramId && legacyApprovedProgramIds.has(resolvedProgramId)) {
    return true;
  }

  return false;
}

/** Logged-in learner without course/program approval — curriculum stays locked. */
export function learnerRequiresEnrollment(args) {
  return Boolean(args?.authenticated) && !learnerCanAccessCourseLessons(args);
}
