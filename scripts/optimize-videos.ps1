param(
  [string]$SourceDir = "public/videos",
  [string]$OutputDir = "public/videos/optimized"
)

$ErrorActionPreference = "Stop"

$resolvedOutput = Join-Path (Get-Location) $OutputDir
$posterDir = Join-Path $resolvedOutput "posters"

New-Item -ItemType Directory -Force -Path $resolvedOutput | Out-Null
New-Item -ItemType Directory -Force -Path $posterDir | Out-Null

Get-ChildItem -Path $SourceDir -File -Filter *.mp4 | ForEach-Object {
  $slug = ($_.BaseName.ToLower() -replace "[^a-z0-9]+", "-" -replace "(^-|-$)", "")
  $out = Join-Path $resolvedOutput "$slug.mp4"
  $poster = Join-Path $posterDir "$slug.jpg"

  ffmpeg -y -hide_banner -loglevel error -i $_.FullName `
    -map 0:v:0 -an `
    -vf "scale='min(1920,iw)':-2:flags=lanczos,fps=30,format=yuv420p" `
    -c:v libx264 -preset veryfast -crf 23 -movflags +faststart `
    $out

  if ((Get-Item $out).Length -gt $_.Length) {
    $tmp = Join-Path $resolvedOutput "$slug.tmp.mp4"
    ffmpeg -y -hide_banner -loglevel error -i $_.FullName `
      -map 0:v:0 -an `
      -vf "scale='min(1440,iw)':-2:flags=lanczos,fps=30,format=yuv420p" `
      -c:v libx264 -preset veryfast -crf 27 -movflags +faststart `
      $tmp
    Move-Item -Force -LiteralPath $tmp -Destination $out
  }

  ffmpeg -y -hide_banner -loglevel error -ss 00:00:01 -i $out -frames:v 1 -q:v 3 $poster
}
