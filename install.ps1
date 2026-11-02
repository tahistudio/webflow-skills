# Developer install: links every skill in this repo into Claude Code's user skills folder,
# so edits in this clone apply immediately. Teammates should install the plugin instead (see README).
# A skill is any folder containing SKILL.md. Junctions are used so no admin rights are needed.
# Run: powershell -ExecutionPolicy Bypass -File .\install.ps1
# Do not use this AND the plugin on the same machine: the skills would load twice.

$repo = $PSScriptRoot
$dest = Join-Path $env:USERPROFILE ".claude\skills"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

Get-ChildItem -Path (Join-Path $repo "plugins") -Recurse -Filter SKILL.md -Depth 4 | ForEach-Object {
    $skillDir = $_.Directory.FullName
    $name = $_.Directory.Name
    $link = Join-Path $dest $name
    if (Test-Path $link) {
        $item = Get-Item $link -Force
        if ($item.LinkType -eq "Junction" -and $item.Target -ne $skillDir) {
            # Repo layout changed: repoint the old junction.
            Remove-Item $link -Force
            New-Item -ItemType Junction -Path $link -Target $skillDir | Out-Null
            Write-Host "relinked $name -> $skillDir"
        } else {
            Write-Host "exists   $name"
        }
    } else {
        New-Item -ItemType Junction -Path $link -Target $skillDir | Out-Null
        Write-Host "linked   $name -> $skillDir"
    }
}
