
import os
from PIL import Image

assets_dir = r"D:/HPL/src/assets"
mock_path = os.path.join(assets_dir, "ps_original_mock.jpg")
ref_path = os.path.join(assets_dir, "ps_ref_clean.png")

img = Image.open(mock_path)
W, H = img.size

# High-resolution crops from ps_original_mock.jpg (682x1024):
# Card 01 WeatherGPT: X=70, Y=370, W=190, H=154
crop1 = img.crop((70, 370, 260, 524))
crop1.save(os.path.join(assets_dir, "ps_01_weathergpt.png"), "PNG")

# Card 02 Rural Market: X=60, Y=540, W=200, H=164
crop2 = img.crop((60, 540, 260, 704))
crop2.save(os.path.join(assets_dir, "ps_02_rural_market.png"), "PNG")

# Card 03 Mystery Box: X=84, Y=715, W=252, H=122
crop3 = img.crop((84, 715, 336, 837))
crop3.save(os.path.join(assets_dir, "ps_03_mystery_box.png"), "PNG")

# Card 03 Hourglass: X=544, Y=716, W=104, H=116
crop4 = img.crop((544, 716, 648, 832))
crop4.save(os.path.join(assets_dir, "ps_03_hourglass.png"), "PNG")

# Also from user uploaded media_1787996993431.png (372x655):
if os.path.exists(ref_path):
    r_img = Image.open(ref_path)
    # Card 01 (Robot scene)
    r1 = r_img.crop((12, 42, 276, 222))
    r1.save(os.path.join(assets_dir, "ps_weathergpt_mobile.png"), "PNG")
    # Card 02 (Farmer scene)
    r2 = r_img.crop((12, 252, 282, 442))
    r2.save(os.path.join(assets_dir, "ps_rural_market_mobile.png"), "PNG")
    # Card 03 (Mystery Box scene)
    r3 = r_img.crop((12, 458, 360, 615))
    r3.save(os.path.join(assets_dir, "ps_mystery_box_mobile.png"), "PNG")

print("Crop finished successfully!")
