import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/global-config';
import { CONTACT_PAGE_DEFAULTS } from 'src/features/contact-page/data/contact-page-defaults';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const FOOTER_LINKS = [
  { name: 'About us', href: paths.about },
  { name: 'Contact us', href: paths.contact },
];

const contactEmail = CONTACT_PAGE_DEFAULTS.sections.details.email;
const contactPhone = CONTACT_PAGE_DEFAULTS.sections.details.phone;

// ----------------------------------------------------------------------

const FooterRoot = styled('footer')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.vars.palette.background.neutral,
  borderTop: `1px solid ${theme.vars.palette.divider}`,
}));

function FooterLink({ href, children, isDark = false }) {
  return (
    <Link
      component={RouterLink}
      href={href}
      color="inherit"
      variant="body2"
      underline="hover"
      sx={{
        color: isDark ? 'grey.400' : 'text.secondary',
        fontWeight: 500,
        transition: (theme) => theme.transitions.create('color'),
        '&:hover': { color: isDark ? 'common.white' : 'primary.main' },
      }}
    >
      {children}
    </Link>
  );
}

function ContactItem({ icon, href, children, isDark = false }) {
  const content = (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Iconify
        icon={icon}
        width={18}
        sx={{ color: isDark ? 'primary.light' : 'primary.main', flexShrink: 0 }}
      />
      <Typography
        variant="body2"
        sx={{
          color: isDark ? 'grey.400' : 'text.secondary',
          fontWeight: 500,
        }}
      >
        {children}
      </Typography>
    </Stack>
  );

  if (href) {
    return (
      <Link
        href={href}
        color="inherit"
        underline="none"
        sx={{
          display: 'block',
          transition: (theme) => theme.transitions.create('opacity'),
          '&:hover': { opacity: 0.82 },
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function Footer({ sx, layoutQuery = 'md', variant = 'default', ...other }) {
  const year = new Date().getFullYear();
  const isDark = variant === 'dark';

  return (
    <FooterRoot
      sx={[
        isDark && {
          bgcolor: 'grey.900',
          color: 'common.white',
          borderTop: 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container
        sx={(theme) => ({
          py: { xs: 5, md: 6 },
          [theme.breakpoints.up(layoutQuery)]: { py: 7 },
        })}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack
              spacing={2}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              <Logo />
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? 'grey.400' : 'text.secondary',
                  maxWidth: 360,
                  lineHeight: 1.7,
                }}
              >
                {CONFIG.appName} helps review centers deliver structured engineering programs,
                assessments, and learner progress in one platform.
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Stack spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'flex-start' }} sx={{ pl: { xs: 2, sm: 0 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: isDark ? 'common.white' : 'text.primary',
                  fontWeight: 700,
                  letterSpacing: 1.1,
                }}
              >
                Platform
              </Typography>
              {FOOTER_LINKS.map((link) => (
                <FooterLink key={link.name} href={link.href} isDark={isDark}>
                  {link.name}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 8, md: 5 }}>
            <Stack spacing={1.75} alignItems={{ xs: 'flex-start', md: 'flex-start' }}>
              <Typography
                variant="overline"
                sx={{
                  color: isDark ? 'common.white' : 'text.primary',
                  fontWeight: 700,
                  letterSpacing: 1.1,
                }}
              >
                Contact
              </Typography>
              <ContactItem icon="solar:letter-bold-duotone" href={`mailto:${contactEmail}`} isDark={isDark}>
                {contactEmail}
              </ContactItem>
              <ContactItem icon="solar:phone-bold-duotone" href={`tel:${contactPhone}`} isDark={isDark}>
                {contactPhone}
              </ContactItem>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: isDark ? 'grey.800' : 'divider' }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="caption" sx={{ color: isDark ? 'grey.600' : 'text.disabled' }}>
            © {year} {CONFIG.appName}. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: isDark ? 'grey.600' : 'text.disabled' }}>
            Exam preparation, course delivery, and learner progress.
          </Typography>
        </Stack>
      </Container>
    </FooterRoot>
  );
}

/** @deprecated Use `<Footer variant="dark" />` — kept for existing imports. */
export function HomeFooter(props) {
  return <Footer variant="dark" {...props} />;
}
