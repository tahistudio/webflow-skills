# Links every skill in this repo into Claude Code's user skills folder.
# A skill is any folder containing SKILL.md. Junctions are used so edits here apply immediately.
# Run: powershell -ExecutionPolicy Bypass -File .\install.ps1

$repo = $PSScriptRoot
$dest = Join-Path $env:USERPROFILE ".claude\skills"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

Get-ChildItem -Path $repo -Recurse -Filter SKILL.md -Depth 2 | ForEach-Object {
    $skillDir = $_.Directory.FullName
    $name = $_.Directory.Name
    $link = Join-Path $dest $name
    if (Test-Path $link) {
        Write-Host "exists   $name"
    } else {
        New-Item -ItemType Junction -Path $link -Target $skillDir | Out-Null
        Write-Host "linked   $name -> $skillDir"
    }
}
