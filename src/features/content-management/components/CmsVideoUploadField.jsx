import { useDropzone } from 'react-dropzone';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { resolveCmsMediaUrl } from 'src/features/homepage-v2/utils/resolve-cms-media-url';
import { uploadCmsMedia, deleteCmsMedia } from 'src/features/homepage-v2/api/homepage-v2-api';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

function slugifyLabel(label) {
  return String(label ?? 'video')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function CmsVideoUploadField({ label, value, onChange, disabled }) {
  const [uploading, setUploading] = useState(false);
  const inputId = useMemo(() => `cms-video-upload-${slugifyLabel(label)}`, [label]);
  const url = resolveCmsMediaUrl(value?.url, value?.mediaId ?? null);

  const onDrop = useCallback(
    async (files) => {
      const file = files?.[0];
      if (!file || disabled) {
        return;
      }
      setUploading(true);
      try {
        const media = await uploadCmsMedia(file, value?.alt ?? label);
        onChange({
          ...value,
          url: media.url,
          mediaId: media.id,
          filename: media.filename,
          alt: media.alt ?? value?.alt ?? label,
          size: media.size,
          mime: media.mime,
        });
        toast.success('Video uploaded.');
      } catch (e) {
        toast.error(e?.message ?? 'Upload failed.');
      } finally {
        setUploading(false);
      }
    },
    [disabled, label, onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
      'video/ogg': ['.ogg'],
    },
    maxFiles: 1,
    disabled: disabled || uploading,
  });

  const handleRemove = async () => {
    if (value?.mediaId) {
      try {
        await deleteCmsMedia(value.mediaId);
      } catch {
        /* file may already be gone */
      }
    }
    onChange({ ...value, url: null, mediaId: null, filename: null, size: null, mime: null });
    toast.info('Video removed.');
  };

  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">{label}</Typography>
      <Box
        {...getRootProps()}
        sx={{
          borderRadius: 2,
          border: (theme) => `2px dashed ${theme.palette.divider}`,
          bgcolor: 'background.neutral',
          p: 2,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <input {...getInputProps()} id={inputId} />
        {uploading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress size={32} />
          </Stack>
        ) : url ? (
          <Box
            component="video"
            src={url}
            controls
            preload="metadata"
            sx={{ width: 1, maxHeight: 280, borderRadius: 1.5, display: 'block', bgcolor: 'common.black' }}
          />
        ) : (
          <Stack alignItems="center" spacing={1} py={3}>
            <Iconify icon="solar:videocamera-add-bold-duotone" width={36} />
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {isDragActive ? 'Drop video here' : 'Drag & drop or click to upload (MP4, WebM, OGG)'}
            </Typography>
          </Stack>
        )}
      </Box>
      <TextField
        size="small"
        label="Alt text"
        value={value?.alt ?? ''}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, alt: e.target.value })}
      />
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="outlined"
          disabled={disabled || uploading}
          onClick={() => document.getElementById(inputId)?.click()}
        >
          Replace
        </Button>
        <Button
          size="small"
          color="error"
          variant="outlined"
          disabled={disabled || !url}
          onClick={handleRemove}
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
}
