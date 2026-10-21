// Adapt env/asset types from the existing app. The actual helper is also exercised
// with fictional objects by the source repository's focused local fixture.
export { privateDownload } from './private-download.mjs';
// Call only with a getClaims/getUser-validated principal and RLS-read asset.
// This helper does not create an S3 signed link or verify actual file content.
