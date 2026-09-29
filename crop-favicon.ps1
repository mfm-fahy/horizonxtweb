Add-Type -AssemblyName System.Drawing

$srcPath = "c:\Users\ELCOT\Desktop\horizonX\public\favicon-source.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y += 2) {
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        # Check for dark navy pixel
        if ($c.R -lt 80 -and $c.G -lt 80 -and $c.B -lt 80) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Detected Icon Bounds: X: $minX to $maxX, Y: $minY to $maxY"

$w = $maxX - $minX + 1
$h = $maxY - $minY + 1

$rect = [System.Drawing.Rectangle]::new($minX, $minY, $w, $h)
$cropped = $bmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save high-res 512x512
$dest512 = [System.Drawing.Bitmap]::new(512, 512)
$g = [System.Drawing.Graphics]::FromImage($dest512)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.DrawImage($cropped, 0, 0, 512, 512)
$g.Dispose()

$dest512.Save("c:\Users\ELCOT\Desktop\horizonX\public\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$dest512.Save("c:\Users\ELCOT\Desktop\horizonX\src\assets\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Save 64x64 icon
$dest64 = [System.Drawing.Bitmap]::new(64, 64)
$g64 = [System.Drawing.Graphics]::FromImage($dest64)
$g64.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g64.DrawImage($cropped, 0, 0, 64, 64)
$g64.Dispose()
$dest64.Save("c:\Users\ELCOT\Desktop\horizonX\public\favicon.ico", [System.Drawing.Imaging.ImageFormat]::Png)
$dest64.Dispose()

$cropped.Dispose()
$dest512.Dispose()
$bmp.Dispose()

Write-Host "Favicon generated successfully!"
