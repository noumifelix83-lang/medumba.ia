Add-Type @"
using System;
using System.Runtime.InteropServices;
public class WinAPI2 {
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

Start-Sleep -Seconds 2

$browser = Get-Process | Where-Object { ($_.Name -match "chrome|msedge|firefox") -and $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if ($browser) {
    [WinAPI2]::ShowWindow($browser.MainWindowHandle, 3)
    [WinAPI2]::SetForegroundWindow($browser.MainWindowHandle)
    Start-Sleep -Seconds 2
}

$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap($screen.Width, $screen.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bmp)
$graphics.CopyFromScreen($screen.Location, [System.Drawing.Point]::Empty, $screen.Size)
$bmp.Save('C:\Users\ndjan\Downloads\medumba\screenshot_dict.png')
$graphics.Dispose()
$bmp.Dispose()
