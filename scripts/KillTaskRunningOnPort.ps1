param ([string] $portNumber)
try {
    Get-NetTCPConnection -State Listen -LocalPort portNumber | ForEach-Object{ Stop-Process -ID $_.OwningProcess -Force}
    Write-Host "Successfully killed process on :" + $portNumber
}
catch {
    Write-Host "Could not kill process on :" + $portNumber
}
