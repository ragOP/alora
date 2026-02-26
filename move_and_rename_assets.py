#!/usr/bin/env python3
"""
Move assets from assets/rgb/ to assets/ with meaningful names and update rgb.html.
"""
import os
import shutil
from pathlib import Path

BASE = Path(__file__).resolve().parent
RGB_DIR = BASE / "assets" / "rgb"
ASSETS_DIR = BASE / "assets"
HTML_FILE = BASE / "rgb.html"

# Map old filename (as in HTML: may have %20) -> new meaningful name in assets/
RENAME_MAP = {
    # CSS / UI icons
    "42574_338308_1714538950-1711367301667_info.png": "info-icon.png",
    "42574_338308_1714541612-1711370973556_3.png": "btn-pattern.png",
    "42574_338308_1714544893-1707336831448_greentick.png": "greentick.png",
    "42574_338308_1714556015-1711393011636_4_5_star_2x.png": "stars-4-5.png",
    "42574_338308_1714538274-1711366759829_bitmap.png": "logo-bitmap.png",
    "42574_338308_1714543933-1711369581080_stars.png": "stars-rating.png",
    "42574_338308_1714542291-1711372411314_ico_stars_2x.webp": "ico-stars-2x.webp",
    "42574_338308_1714542732-1711372965052_11.png": "step-1.png",
    "42574_338308_1714542831-1711373170379_22.png": "step-2.png",
    "42574_338308_1714542855-1711373161107_333.png": "step-3.png",
    "42574_338308_1714542928-1711373178776_44.png": "step-4.png",
    "42574_338308_1714542961-1711373186630_55.png": "step-5.png",
    "42574_338308_1714547821-trustpilot.svg": "trustpilot.svg",
    "42574_338308_1714547902-stars-4.5%20%281%29.svg": "stars-4-5-alt.svg",
    "42574_338308_1714548813-stars-5.svg": "stars-5.svg",
    "42574_338308_1714557588-nwcheck.svg": "nwcheck.svg",
    "42574_338308_1714558049-1711452952776_2.jpg": "product-teaser.jpg",
    "42574_338308_1714578044-1711471878325_1702576968014_FTM_Pain_Relief_advertorial_v01_12.11.23_1_1_4_3_.jpg": "advertorial-hero.jpg",
    "42574_338308_1714579856-1711461897636_4.png": "step-icon-4.png",
    "42574_338308_1714579878-1711461923065_2.png": "step-icon-2.png",
    "42574_338308_1714579908-1711461935757_3.png": "step-icon-3.png",
    "42574_338308_1714579917-1711461945141_1.png": "step-icon-1.png",
    "42574_338308_1714580325-1711466088389_2_min.gif": "loader.gif",
    "42574_338308_1714584349-1662477222-dmca.webp": "dmca.webp",
    "90140_907870_1756908062-10801080%20-%20PNG%20%2821%29.png": "product-pack.png",
    "90140_907870_1766314236-10801080%20-%20Price%20%287%29.jpg": "price-tag.jpg",
    # Content images - numbered by order
    "11220_742653_1740941737-1520800%20%2826%29.jpg": "content-26.jpg",
    "11220_742653_1741003653-1520800%20%2830%29.jpg": "content-30.jpg",
    "11220_742653_1741515975-1520800%20%2837%29.jpg": "content-37.jpg",
    "11220_875086_1753537987-250250%20%2815%29.jpg": "avatar-15.jpg",
    "11220_875086_1754314820-1520800%20%2844%29.jpg": "content-44.jpg",
    "11220_875086_1754314920-1520800%20%2845%29.jpg": "content-45.jpg",
    "11220_875086_1754315609-1520800%20%2847%29.jpg": "content-47.jpg",
    "11220_875086_1754315682-1520800%20%2848%29.jpg": "content-48.jpg",
    "11220_875086_1754316668-1520800%20%2850%29.jpg": "content-50.jpg",
    "11220_875086_1754317344-1520800%20%2852%29.jpg": "content-52.jpg",
    "11220_875086_1754317630-1520800%20%2853%29.jpg": "content-53.jpg",
    "11220_875086_1754318044-1520800%20Split%20%2838%29.jpg": "content-split-38.jpg",
    "11220_875086_1754319245-1520800%20Split%20%2840%29.jpg": "content-split-40.jpg",
    "11220_875086_1754320004-1520800%20Split%20%2841%29.jpg": "content-split-41.jpg",
    "11220_875086_1754320337-1520800%20Split%20%2842%29.jpg": "content-split-42.jpg",
    "11220_875086_1754320566-1520800%20Split%20%2843%29.jpg": "content-split-43.jpg",
    "11220_875086_1754320714-1520800%20Split%20%2844%29.jpg": "content-split-44.jpg",
    "11220_875086_1754320884-1520800%20%2854%29.jpg": "content-54.jpg",
    "11220_875086_1754321147-1520800%20%2855%29.jpg": "content-55.jpg",
    "11220_875086_1754322608-250250%20%2820%29.jpg": "avatar-20.jpg",
    "11220_875086_1754322616-250250%20%2819%29.jpg": "avatar-19.jpg",
    "11220_875086_1754463627-Pelvvidex.jpg": "pelvidex-product.jpg",
    "11220_875086_1755503611-close.jpg": "close-icon.jpg",
    "11220_875086_1755549452-1520800%20Split%20%2845%29.jpg": "content-split-45.jpg",
    "11220_875086_1755549667-1520800%20Split%20%2846%29.jpg": "content-split-46.jpg",
    "11220_875086_1755692866-16.jpg": "content-16.jpg",
    # Video posters (order in page)
    "11220_thumbnails_1741606873-7941c36d-6b72-4d84-bc4e-905bd9047b95mp4.jpg": "video-poster-1.jpg",
    "11220_thumbnails_1754319764-3b3dae2a-ad9a-4965-a9e1-280af1e4568dmp4.jpg": "video-poster-2.jpg",
    "11220_thumbnails_1755536727-f7a69ff6-7e1e-43b1-842a-233118e2036cmp4.jpg": "video-poster-3.jpg",
    "11220_thumbnails_1755536787-2052ba9c-b204-4294-9964-6a88a8fd27c6mp4.jpg": "video-poster-4.jpg",
    "11220_thumbnails_1755536801-3f9eab48-36d0-46a5-a578-dfc1599ed369mp4.jpg": "video-poster-5.jpg",
    "11220_thumbnails_1755536823-e1decf5b-4d66-4e13-8128-81b1fca50a60mp4.jpg": "video-poster-6.jpg",
    "11220_thumbnails_1755536869-fb66bbad-cb58-4688-a438-6db56317fd75mp4.jpg": "video-poster-7.jpg",
    "11220_thumbnails_1755536891-24b9200f-3c82-4058-add3-f510810be669mp4.jpg": "video-poster-8.jpg",
    "11220_thumbnails_1755536903-cdc96ce9-2489-48d6-811a-587200b50627mp4.jpg": "video-poster-9.jpg",
    "11220_thumbnails_1755536923-ffa52f01-3efa-4fde-ab79-c59d85a681bfmp4.jpg": "video-poster-10.jpg",
    "11220_thumbnails_1755536938-308f9cd9-860d-4396-9e40-c382a528c3demp4.jpg": "video-poster-11.jpg",
    "11220_thumbnails_1755536950-2a60ab20-7500-45cf-a70a-7fef15e27cc8mp4.jpg": "video-poster-12.jpg",
}


def main():
    if not RGB_DIR.exists():
        print("assets/rgb/ not found")
        return

    # Copy with new names (avoid overwriting existing assets with different content)
    for old_name, new_name in RENAME_MAP.items():
        src = RGB_DIR / old_name
        if not src.exists():
            # try unquoted variant
            alt = old_name.replace("%20", " ")
            if (RGB_DIR / alt).exists():
                src = RGB_DIR / alt
            else:
                print(f"Skip (not found): {old_name}")
                continue
        dst = ASSETS_DIR / new_name
        shutil.copy2(src, dst)
        print(f"  {old_name[:50]}... -> {new_name}")

    # Update HTML: replace assets/rgb/OLD -> assets/NEW (order by length desc so longer matches first)
    content = HTML_FILE.read_text(encoding="utf-8", errors="replace")
    for old_name, new_name in sorted(RENAME_MAP.items(), key=lambda x: -len(x[0])):
        old_path = "assets/rgb/" + old_name
        new_path = "assets/" + new_name
        content = content.replace(old_path, new_path)

    HTML_FILE.write_text(content, encoding="utf-8")
    print("Updated rgb.html references.")

    # Remove assets/rgb folder
    for f in RGB_DIR.iterdir():
        if f.is_file():
            f.unlink()
    RGB_DIR.rmdir()
    print("Removed assets/rgb/ folder.")


if __name__ == "__main__":
    main()
