import Box from '@mui/material/Box';

import { resolveCmsMediaUrl } from 'src/features/homepage-v2/utils/resolve-cms-media-url';

import { ImagePlaceholder } from './ImagePlaceholder';

export function CmsVideo({ media, posterMedia, label = 'Video', aspectRatio = '16 / 9', sx }) {
  const url = resolveCmsMediaUrl(media?.url, media?.mediaId ?? media?.id ?? null);
  const posterUrl = resolveCmsMediaUrl(
    posterMedia?.url,
    posterMedia?.mediaId ?? posterMedia?.id ?? null
  );

  if (url) {
    return (
      <Box
        component="video"
        src={url}
        poster={posterUrl || undefined}
        controls
        playsInline
        preload="metadata"
        aria-label={media?.alt || label}
        sx={[
          {
            width: 1,
            display: 'block',
            aspectRatio,
            borderRadius: 3,
            bgcolor: 'common.black',
            objectFit: 'cover',
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    );
  }

  return <ImagePlaceholder label={label} aspectRatio={aspectRatio} sx={sx} />;
}
