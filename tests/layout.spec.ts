import { test, expect } from '@playwright/test';

test.describe('레이아웃 및 반응형 디자인 테스트', () => {
  test('로그인 페이지 - 데스크톱 레이아웃', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3003/ko/login');

    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');

    // 메인 컨텐츠 요소 확인
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // 스크린샷 저장
    await page.screenshot({ path: 'tests/screenshots/login-desktop.png', fullPage: true });

    // 레이아웃 확인 - 중앙 정렬
    const mainBox = await main.boundingBox();
    const pageWidth = page.viewportSize()?.width || 0;

    console.log('Desktop Layout Check:');
    console.log(`- Page width: ${pageWidth}px`);
    console.log(`- Main element width: ${mainBox?.width}px`);
    console.log(`- Main element x position: ${mainBox?.x}px`);

    // max-w-md (28rem = 448px) 이하여야 함
    expect(mainBox?.width).toBeLessThanOrEqual(450);

    // 중앙 정렬 확인 (좌우 여백이 비슷해야 함)
    const leftMargin = mainBox?.x || 0;
    const rightMargin = pageWidth - (leftMargin + (mainBox?.width || 0));
    const marginDiff = Math.abs(leftMargin - rightMargin);

    console.log(`- Left margin: ${leftMargin}px`);
    console.log(`- Right margin: ${rightMargin}px`);
    console.log(`- Margin difference: ${marginDiff}px`);

    // 좌우 여백 차이가 10px 이내여야 함 (중앙 정렬)
    expect(marginDiff).toBeLessThan(10);
  });

  test('로그인 페이지 - 모바일 레이아웃', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3003/ko/login');

    await page.waitForLoadState('networkidle');

    const main = page.locator('main');
    await expect(main).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/login-mobile.png', fullPage: true });

    const mainBox = await main.boundingBox();
    const pageWidth = page.viewportSize()?.width || 0;

    console.log('Mobile Layout Check:');
    console.log(`- Page width: ${pageWidth}px`);
    console.log(`- Main element width: ${mainBox?.width}px`);
    console.log(`- Main element x position: ${mainBox?.x}px`);

    // 모바일에서는 전체 폭 사용 (padding 제외)
    expect(mainBox?.width).toBeGreaterThan(300);
  });

  test('인증번호 입력 페이지 - 데스크톱', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3003/ko/verification?phone=010-1234-5678');

    await page.waitForLoadState('networkidle');

    const main = page.locator('main');
    await expect(main).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/verification-desktop.png', fullPage: true });

    const mainBox = await main.boundingBox();
    const pageWidth = page.viewportSize()?.width || 0;
    const leftMargin = mainBox?.x || 0;
    const rightMargin = pageWidth - (leftMargin + (mainBox?.width || 0));
    const marginDiff = Math.abs(leftMargin - rightMargin);

    console.log('Verification Desktop Layout:');
    console.log(`- Main width: ${mainBox?.width}px`);
    console.log(`- Margin difference: ${marginDiff}px`);

    expect(marginDiff).toBeLessThan(10);
  });

  test('프로필 설정 페이지 - 데스크톱', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3003/ko/profile-setup');

    await page.waitForLoadState('networkidle');

    const main = page.locator('main');
    await expect(main).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/profile-desktop.png', fullPage: true });

    const mainBox = await main.boundingBox();
    const pageWidth = page.viewportSize()?.width || 0;
    const leftMargin = mainBox?.x || 0;
    const rightMargin = pageWidth - (leftMargin + (mainBox?.width || 0));
    const marginDiff = Math.abs(leftMargin - rightMargin);

    console.log('Profile Setup Desktop Layout:');
    console.log(`- Main width: ${mainBox?.width}px`);
    console.log(`- Margin difference: ${marginDiff}px`);

    expect(marginDiff).toBeLessThan(10);
  });

  test('CSS 로딩 확인', async ({ page }) => {
    await page.goto('http://localhost:3003/ko/login');
    await page.waitForLoadState('networkidle');

    // Tailwind CSS가 제대로 적용되었는지 확인
    const main = page.locator('main');
    const styles = await main.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        maxWidth: computed.maxWidth,
        marginLeft: computed.marginLeft,
        marginRight: computed.marginRight,
        marginInline: computed.marginInline || computed.marginInlineStart + ' ' + computed.marginInlineEnd,
        width: computed.width,
        display: computed.display,
      };
    });

    console.log('CSS Properties:');
    console.log(`- max-width: ${styles.maxWidth}`);
    console.log(`- margin-left: ${styles.marginLeft}`);
    console.log(`- margin-right: ${styles.marginRight}`);
    console.log(`- margin-inline: ${styles.marginInline}`);
    console.log(`- width: ${styles.width}`);
    console.log(`- display: ${styles.display}`);

    // max-w-md = 28rem = 448px
    expect(styles.maxWidth).toBe('448px');
    // mx-auto가 제대로 적용되면 margin-left와 margin-right가 같아야 함 (중앙 정렬)
    expect(styles.marginLeft).toBe(styles.marginRight);
  });
});
