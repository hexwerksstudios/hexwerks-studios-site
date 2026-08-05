$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$errors = New-Object System.Collections.Generic.List[string]
$htmlFiles = Get-ChildItem -LiteralPath $root -Recurse -File -Filter "*.html" |
  Where-Object { $_.FullName -notmatch "[\\/]\.git[\\/]" }

function Add-ValidationError([string]$message) {
  $errors.Add($message)
}

function Resolve-SitePath([string]$reference, [string]$sourceDirectory) {
  $clean = ($reference -split "[?#]")[0]
  if ([string]::IsNullOrWhiteSpace($clean)) { return $null }
  if ($clean -match "^(https?:|mailto:|tel:|javascript:|data:|//)") { return $null }

  if ($clean.StartsWith("/")) {
    $candidate = Join-Path $root $clean.TrimStart("/")
  } else {
    $candidate = Join-Path $sourceDirectory $clean
  }

  if ($clean.EndsWith("/")) {
    $candidate = Join-Path $candidate "index.html"
  }

  return [System.IO.Path]::GetFullPath($candidate)
}

foreach ($file in $htmlFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw
  $relative = $file.FullName.Substring($root.Length).TrimStart("\\")

  if ($text -notmatch "<title>[^<]+</title>") { Add-ValidationError "$relative is missing a title." }
  if ($text -notmatch '<meta\s+name="description"\s+content="[^"]+"') { Add-ValidationError "$relative is missing a meta description." }
  if ($text -notmatch '<link\s+rel="canonical"\s+href="[^"]+"') { Add-ValidationError "$relative is missing a canonical URL." }
  if ($text -notmatch '<meta\s+property="og:image"\s+content="[^"]+"') { Add-ValidationError "$relative is missing an Open Graph image." }
  if ($text -notmatch '<main[^>]+id="main-content"') { Add-ValidationError "$relative is missing the main-content landmark." }

  $h1Count = [regex]::Matches($text, "<h1(?:\s[^>]*)?>").Count
  if ($h1Count -ne 1) { Add-ValidationError "$relative has $h1Count h1 elements; expected 1." }

  $references = [regex]::Matches($text, '(?:href|src)="([^"]+)"')
  foreach ($match in $references) {
    $target = Resolve-SitePath $match.Groups[1].Value $file.DirectoryName
    if ($target -and -not (Test-Path -LiteralPath $target)) {
      Add-ValidationError "$relative references missing file $($match.Groups[1].Value)."
    }
  }

  $externalLinks = [regex]::Matches($text, '<a\s+[^>]*href="https?://[^"]+"[^>]*>')
  foreach ($link in $externalLinks) {
    if ($link.Value -notmatch 'target="_blank"' -or $link.Value -notmatch 'rel="noopener noreferrer"') {
      Add-ValidationError "$relative contains an external link without safe new-tab attributes."
    }
  }

  $anchors = [regex]::Matches($text, 'href="#([^"]+)"')
  foreach ($anchor in $anchors) {
    $id = [regex]::Escape($anchor.Groups[1].Value)
    if ($text -notmatch "id=[`"']$id[`"']") {
      Add-ValidationError "$relative links to missing in-page anchor #$($anchor.Groups[1].Value)."
    }
  }
}

$siteDataPath = Join-Path $root "data/site-content.js"
$siteData = Get-Content -LiteralPath $siteDataPath -Raw
$dataReferences = [regex]::Matches($siteData, '(?:href|image):\s*"([^"]+)"')
foreach ($match in $dataReferences) {
  $target = Resolve-SitePath $match.Groups[1].Value $root
  if ($target -and -not (Test-Path -LiteralPath $target)) {
    Add-ValidationError "data/site-content.js references missing path $($match.Groups[1].Value)."
  }
}

foreach ($cssName in @("styles.css", "site.css")) {
  $cssPath = Join-Path $root $cssName
  $css = Get-Content -LiteralPath $cssPath -Raw
  $urls = [regex]::Matches($css, 'url\(["'']?([^"'')]+)["'']?\)')
  foreach ($match in $urls) {
    $target = Resolve-SitePath $match.Groups[1].Value $root
    if ($target -and -not (Test-Path -LiteralPath $target)) {
      Add-ValidationError "$cssName references missing asset $($match.Groups[1].Value)."
    }
  }
}

foreach ($scriptName in @("raven-scribe.js", "site.js", "data/site-content.js")) {
  & node --check (Join-Path $root $scriptName)
  if ($LASTEXITCODE -ne 0) { Add-ValidationError "$scriptName failed node --check." }
}

if ($errors.Count -gt 0) {
  Write-Host "Site validation failed:" -ForegroundColor Red
  $errors | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
  exit 1
}

Write-Host "Site validation passed for $($htmlFiles.Count) HTML routes." -ForegroundColor Green
