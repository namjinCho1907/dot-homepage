from PIL import Image

# 원본 이미지 로드
original = Image.open('/Users/namjincho/Desktop/링커/링커아이콘.png')
original = original.convert('RGBA')

# 완전한 흰색 배경 이미지 생성
width, height = original.size
white_bg = Image.new('RGB', (width, height), (255, 255, 255))

# 원본 이미지의 픽셀 데이터를 처리
pixels = original.load()
white_pixels = white_bg.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if a > 0:  # 투명하지 않은 픽셀만 유지
            white_pixels[x, y] = (r, g, b)

# 저장
white_bg.save('/Users/namjincho/dot-homepage/public/linker-icon-white.png')
print("완전한 흰색 배경 링커 아이콘을 생성했습니다: linker-icon-white.png")