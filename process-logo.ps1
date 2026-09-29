Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\ELCOT\Desktop\horizonX\public\logo-source.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

Write-Host "Logo source size: $($bmp.Width) x $($bmp.Height)"

# Find content bounds (pixels that are not white)
$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        # Check if pixel is not white (brightness < 240)
        if ($c.R -lt 240 -or $c.G -lt 240 -or $c.B -lt 240) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Logo Content Bounds: X: $minX to $maxX, Y: $minY to $maxY"

# Add padding
$pad = 12
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($bmp.Width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($bmp.Height - $cropY, ($maxY - $minY) + ($pad * 2))

$rect = [System.Drawing.Rectangle]::new($cropX, $cropY, $cropW, $cropH)
$cropped = $bmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save standard cropped logo
$cropped.Save("c:\Users\ELCOT\Desktop\horizonX\public\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Save("c:\Users\ELCOT\Desktop\horizonX\src\assets\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Create Transparent & Dark-Mode Optimized Logo (logo-darkmode.png)
# In dark mode:
# - White background becomes transparent
# - Dark navy text and "H" become white
# - Gold and teal strokes & star are preserved vibrantly!
$darkBmp = [System.Drawing.Bitmap]::new($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $c = $cropped.GetPixel($x, $y)
        $brightness = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        
        # If nearly white background, make transparent
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            $darkBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
        # If it's the gold part (R > 180, G > 100, B < 80)
        elseif ($c.R -gt 170 -and $c.G -gt 110 -and $c.B -lt 80) {
            # Keep gold
            $darkBmp.SetPixel($x, $y, $c)
        }
        # If it's the teal/cyan part (G > 100, B > 120, R < 80)
        elseif ($c.B -gt 110 -and $c.G -gt 90 -and $c.R -lt 80) {
            # Keep teal
            $darkBmp.SetPixel($x, $y, $c)
        }
        # If it's dark navy text/mark (all low values)
        elseif ($c.R -lt 120 -and $c.G -lt 120 -and $c.B -lt 140) {
            # Convert dark navy to crisp white for dark backgrounds
            $alpha = 255 - [Math]::Min(255, [Math]::Max(0, ($brightness - 180) * 4))
            $darkBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
        }
        else {
            # Transition edge: smooth alpha
            if ($brightness -gt 220) {
                $alpha = [Math]::Max(0, 255 - ($brightness - 220) * 12)
                $darkBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
            } else {
                $darkBmp.SetPixel($x, $y, $c)
            }
        }
    }
}

$darkBmp.Save("c:\Users\ELCOT\Desktop\horizonX\public\logo-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
$darkBmp.Save("c:\Users\ELCOT\Desktop\horizonX\src\assets\logo-transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)

$darkBmp.Dispose()
$cropped.Dispose()
$bmp.Dispose()

Write-Host "Logos processed successfully!"
