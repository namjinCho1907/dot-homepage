from PIL import Image, ImageDraw

# 원본 이미지 로드
original = Image.open('/Users/namjincho/Desktop/링커/링커아이콘.png')
original = original.convert('RGBA')

# 완전히 새로운 순백색 배경 이미지 생성
width, height = original.size
pure_white = Image.new('RGB', (width, height), '#FFFFFF')

# 원본 이미지에서 알파 값이 있는 부분만 추출하여 새 이미지에 그리기
draw = ImageDraw.Draw(pure_white)

# 원본 픽셀 데이터 분석
pixels = original.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        # 투명하지 않은 픽셀이면서 색상이 있는 경우만 그리기
        if a > 128:  # 반투명 이상인 픽셀만
            # 배경색이 아닌 실제 아이콘 색상만 유지
            if not (r > 200 and g > 200 and b > 200):  # 흰색/연한 회색이 아닌 경우만
                pure_white.putpixel((x, y), (r, g, b))

pure_white.save('/Users/namjincho/dot-homepage/public/linker-icon-pure-white.png')
print("순백색 배경 링커 아이콘을 생성했습니다: linker-icon-pure-white.png")