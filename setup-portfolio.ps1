<#
.SYNOPSIS
    Sets up and deploys Nicolai Uhre Mandrup's portfolio to GitHub Pages.
.EXAMPLE
    .\setup-portfolio.ps1
    .\setup-portfolio.ps1 -RepoName "my-portfolio" -GitHubUsername "Mandrupnicolai"
#>

param(
    [string]$RepoName = "portfolio",
    [string]$GitHubUsername = "Mandrupnicolai"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step { param($msg) Write-Host "  -> $msg" -ForegroundColor Cyan }
function Write-Ok   { param($msg) Write-Host "  OK $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "  !! $msg" -ForegroundColor Yellow }
function Write-Fail { param($msg) Write-Host "  XX $msg" -ForegroundColor Red; exit 1 }

Write-Host ""
Write-Host "  Portfolio Setup -- GitHub Pages" -ForegroundColor White
Write-Host ""

Write-Step "Checking prerequisites..."
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Fail "git is not installed. Install from https://git-scm.com"
}
Write-Ok "git found"

$ghAvailable = $null -ne (Get-Command gh -ErrorAction SilentlyContinue)
if (-not $ghAvailable) {
    Write-Warn "GitHub CLI (gh) not found. Install from: https://cli.github.com"
    Write-Warn "You will need to enable Pages manually after pushing."
} else {
    Write-Ok "GitHub CLI found"
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Step "Source directory: $ScriptDir"

$RequiredFiles = @("index.html", "assets\css\style.css", "assets\js\main.js")
foreach ($f in $RequiredFiles) {
    if (-not (Test-Path (Join-Path $ScriptDir $f))) {
        Write-Fail "Missing file: $f -- run this script from the portfolio root folder."
    }
}
Write-Ok "All source files present"

Write-Step "Initialising git repository..."
Set-Location $ScriptDir

if (-not (Test-Path ".git")) {
    git init -b main | Out-Null
    Write-Ok "Git repository initialised"
} else {
    Write-Ok "Git repository already exists"
}

$RemoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"
Write-Step "Configuring remote: $RemoteUrl"

$existingRemote = git remote 2>$null | Where-Object { $_ -eq "origin" }
if ($existingRemote) {
    git remote set-url origin $RemoteUrl
    Write-Ok "Remote updated"
} else {
    git remote add origin $RemoteUrl
    Write-Ok "Remote added"
}

@".DS_Store
Thumbs.db
*.log
node_modules/
.env
"@ | Set-Content -Path ".gitignore" -Encoding UTF8
Write-Ok ".gitignore created"

@"# Nicolai Uhre Mandrup -- Portfolio
Live: https://$GitHubUsername.github.io/$RepoName
"@ | Set-Content -Path "README.md" -Encoding UTF8
Write-Ok "README.md created"

Write-Step "Staging files..."
git add -A

$status = git status --porcelain
if (-not $status) {
    Write-Warn "Nothing to commit -- already up to date"
} else {
    git commit -m "feat: initial portfolio deployment"
    Write-Ok "Commit created"
}

if ($ghAvailable) {
    Write-Step "Checking GitHub repository..."
    gh repo view "$GitHubUsername/$RepoName" 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        gh repo create "$RepoName" --public --source=. --remote=origin --push
        Write-Ok "Repository created and pushed"
    } else {
        git push -u origin main --force
        Write-Ok "Pushed to origin/main"
    }
    Write-Warn "Enable Pages manually if not auto-enabled:"
    Write-Warn "  Settings -> Pages -> Source: GitHub Actions"
} else {
    git push -u origin main --force
    Write-Ok "Pushed!"
    Write-Warn "Manual steps:"
    Write-Warn "  1. Create repo at https://github.com/new (name: $RepoName, public)"
    Write-Warn "  2. Settings -> Pages -> Source: GitHub Actions"
}

Write-Host ""
Write-Host "  All done!" -ForegroundColor Green
Write-Host "  Live at: https://$GitHubUsername.github.io/$RepoName" -ForegroundColor Cyan
Write-Host "  First deploy takes ~2 minutes." -ForegroundColor Gray
Write-Host ""
