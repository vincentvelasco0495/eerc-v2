export const styles = {
  stickyWrap: { position: { lg: 'sticky' }, top: { lg: 24 } },
  card: {
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
  },
  stackPadding: { p: 2.5 },
  avatar: {
    width: 56,
    height: 56,
    bgcolor: 'warning.lighter',
    color: 'warning.dark',
    fontWeight: 700,
  },
  subtitle: { color: 'primary.main', fontWeight: 600 },
  groupHeading: { color: 'text.disabled', letterSpacing: 1.1, px: 0.5 },
};

export function getSidebarItemSx(item) {
  return {
    px: 1.5,
    py: { xs: 1.2, sm: 1.1 },
    minHeight: { xs: 48, sm: 44 },
    borderRadius: 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1.25,
    color: item.active ? 'primary.main' : 'text.secondary',
    bgcolor: item.active ? 'primary.lighter' : 'transparent',
    textDecoration: 'none',
    cursor: item.action === 'logout' || item.path ? 'pointer' : 'default',
    transition: (theme) => theme.transitions.create(['background-color', 'color']),
  };
}

export const stylesChip = {
  height: 20,
  '& .MuiChip-label': { px: 0.85, fontSize: 11, fontWeight: 700 },
};

const bulletSvg = `"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"`;

export const subNavListSx = (theme) => ({
  position: 'relative',
  pl: '14px',
  ml: '15px',
  '&::before': {
    top: 0,
    left: 0,
    width: '2px',
    content: '""',
    position: 'absolute',
    backgroundColor: theme.palette.divider,
    bottom: 'calc(36px - 2px - 7px)',
  },
});

export function getSubSidebarItemSx(item, theme) {
  return {
    ...getSidebarItemSx(item),
    position: 'relative',
    minHeight: 36,
    py: 0.85,
    pl: 2.25,
    '&::before': {
      left: 0,
      content: '""',
      position: 'absolute',
      width: 14,
      height: 14,
      backgroundColor: theme.palette.divider,
      mask: `url(${bulletSvg}) no-repeat 50% 50%/100% auto`,
      WebkitMask: `url(${bulletSvg}) no-repeat 50% 50%/100% auto`,
      transform: 'translate(-14px, -4px)',
    },
  };
}
