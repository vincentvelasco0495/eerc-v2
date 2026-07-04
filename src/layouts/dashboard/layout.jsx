import { merge } from 'es-toolkit';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';
import { paths, isCourseCurriculumBuilderPath } from 'src/routes/paths';

import { Logo } from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';

import { useAuthContext } from 'src/auth/hooks';

import { Footer } from '../components/site-footer';
import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { MainSection, HeaderSection, LayoutSection } from '../core';
import { LmsNotificationsDrawer } from './lms-notifications-drawer';
import { dashboardLayoutVars, dashboardNavColorVars } from './css-vars';
import { PublicMarketingHeader } from '../main/public-marketing-header';

// ----------------------------------------------------------------------

export function DashboardLayout({ sx, cssVars, children, slotProps, layoutQuery = 'lg' }) {
  const theme = useTheme();
  const pathname = usePathname();
  const { authenticated } = useAuthContext();

  const settings = useSettingsContext();

  const navVars = dashboardNavColorVars(theme, settings.state.navColor, settings.state.navLayout);

  const isAssignmentStudentsPage = /^\/assignment\/[^/]+\/students\/?$/.test(pathname ?? '');
  const isAssignmentLeaderboardPage = /^\/assignment\/[^/]+\/leaderboard\/?$/.test(pathname ?? '');
  const isQuizStudentsPage = /^\/student-quizzes\/[^/]+\/students\/?$/.test(pathname ?? '');
  const isQuizLeaderboardPage = /^\/student-quizzes\/[^/]+\/leaderboard\/?$/.test(pathname ?? '');
  const isStudentAssignmentLeaderboardPage = /^\/assignments\/[^/]+\/leaderboard\/?$/.test(pathname ?? '');
  const isStudentQuizLeaderboardPage = /^\/quizzes\/[^/]+\/leaderboard\/?$/.test(pathname ?? '');

  const isStudentWorkspace = [
    paths.dashboard.home,
    paths.dashboard.instructorHome,
    paths.dashboard.announcement,
    paths.dashboard.feedback,
    paths.dashboard.settingProfile,
    paths.dashboard.gradebook,
    paths.dashboard.studentQuizzes,
    paths.dashboard.courseCurriculum,
    paths.dashboard.assignment,
    paths.dashboard.settingInstructor,
    paths.dashboard.enrollment,
    paths.dashboard.settingProgram,
    paths.dashboard.settingBatchEnroll,
    paths.dashboard.settingModeOfLearning,
    paths.dashboard.settingBranchEnroll,
    paths.dashboard.settingReviewSchedule,
    paths.dashboard.settingHonorsAwardsDiscount,
    paths.dashboard.settingPackageEnroll,
    paths.dashboard.settingStudent,
    paths.dashboard.settingPayment,
    paths.dashboard.availablePrograms,
    paths.dashboard.studentAssignments,
    paths.dashboard.quizzes.root,
    paths.dashboard.quizzes.history,
    paths.dashboard.studentSettings,
  ].includes(pathname) || isAssignmentStudentsPage || isAssignmentLeaderboardPage || isQuizStudentsPage || isQuizLeaderboardPage || isStudentAssignmentLeaderboardPage || isStudentQuizLeaderboardPage;

  const courseLookupSegment = '[^/]+';
  const isCourseDetailsLanding =
    new RegExp(`^/course-details/${courseLookupSegment}/?$`).test(pathname ?? '') ||
    new RegExp(`^/courses/${courseLookupSegment}/?$`).test(pathname ?? '');

  /** Course landing + lessons + quizzes under `/course-details/:slug/...`. */
  const isLearnerCourseShell =
    isCourseDetailsLanding ||
    new RegExp(`^/course-details/${courseLookupSegment}/(text-lesson|video-lesson|quiz)/`).test(
      pathname ?? ''
    ) ||
    new RegExp(`^/courses/${courseLookupSegment}/(text-lesson|video-lesson|quiz)/`).test(
      pathname ?? ''
    );

  const isContentManagementShell = /^\/content-management(\/.*)?$/.test(pathname ?? '');

  /** Quiz attempt history (`/quizzes/history` or legacy `/history`). */
  const isQuizHistoryShell =
    pathname === paths.dashboard.quizzes.history ||
    /^\/quizzes\/history\/?$/.test(pathname ?? '') ||
    /^\/history\/?$/.test(pathname ?? '');

  const isCurriculumBuilder = isCourseCurriculumBuilderPath(pathname);

  const guestCourseDetailsMarketingHeader = isCourseDetailsLanding && !authenticated;

  /** Light integrated header (not global dark `apparent` nav bar). */
  const lightIntegratedHeaderVars =
    authenticated &&
    (isLearnerCourseShell || isContentManagementShell || isQuizHistoryShell) &&
    !guestCourseDetailsMarketingHeader
      ? dashboardNavColorVars(theme, 'integrate', settings.state.navLayout).layout
      : {};

  const hideDashboardHeader =
    isCurriculumBuilder || /^\/program-course-detail(\/.*)?$/.test(pathname ?? '');
  const hideHeaderLogo = isLearnerCourseShell;

  const isNavMini = settings.state.navLayout === 'mini';
  const isNavHorizontal = settings.state.navLayout === 'horizontal';
  const isNavVertical = isNavMini || settings.state.navLayout === 'vertical';

  /** Controls header tint/height + logo chrome. */
  const showHorizontalNavRail = isStudentWorkspace ? isNavHorizontal : true;

  const renderHeader = () => {
    const headerSlotProps = {
      container: {
        maxWidth: false,
        sx: {
          width: 1,
          maxWidth: 'none !important',
          mx: 0,
          px: { xs: 2, sm: 3, [layoutQuery]: 5 },
          ...(showHorizontalNavRail && {
            bgcolor: 'var(--layout-nav-bg)',
            height: { [layoutQuery]: 'var(--layout-nav-horizontal-height)' },
            [`& .${iconButtonClasses.root}`]: { color: 'var(--layout-nav-text-secondary-color)' },
          }),
        },
      },
    };

    const headerSlots = {
      topArea: (
        <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
          This is an info Alert.
        </Alert>
      ),
      bottomArea: null,
      leftArea: (
        <>
          {/** @slot Logo */}
          {showHorizontalNavRail && !hideHeaderLogo && <Logo sx={{ display: 'inline-flex' }} />}
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Notifications popover */}
          <LmsNotificationsDrawer />

          {/** @slot Settings button */}
          <SettingsButton />

          {/** @slot Account drawer */}
          <AccountDrawer />
        </Box>
      ),
    };

    return (
      <HeaderSection
        layoutQuery={layoutQuery}
        disableElevation={showHorizontalNavRail ? false : isNavVertical}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const renderFooter = () => <Footer layoutQuery={layoutQuery} sx={slotProps?.footer?.sx} />;

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  const headerSection = (() => {
    if (hideDashboardHeader) {
      return null;
    }
    if (guestCourseDetailsMarketingHeader) {
      return <PublicMarketingHeader layoutQuery="md" slotProps={slotProps} />;
    }
    return renderHeader();
  })();

  return (
    <LayoutSection
      headerSection={headerSection}
      sidebarSection={null}
      footerSection={renderFooter()}
      cssVars={{
        ...dashboardLayoutVars(theme),
        ...navVars.layout,
        ...lightIntegratedHeaderVars,
        ...(isCurriculumBuilder && {
          '--layout-dashboard-content-pt': '0px',
          '--layout-dashboard-content-pb': '0px',
        }),
        ...cssVars,
      }}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
