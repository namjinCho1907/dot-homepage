from PIL import Image

# 원본 이미지 로드
original = Image.open('/Users/namjincho/Desktop/링커/링커아이콘.png')
original = original.convert('RGBA')

# 새로운 흰색 배경 이미지 생성
width, height = original.size
white_bg_image = Image.new('RGBA', (width, height), (255, 255, 255, 255))

# 원본 이미지를 흰색 배경 위에 합성
result = Image.alpha_composite(white_bg_image, original)

# RGB로 변환해서 저장
result = result.convert('RGB')
result.save('/Users/namjincho/dot-homepage/public/linker-icon-white.png')
print("흰색 배경 링커 아이콘을 생성했습니다: linker-icon-white.png")