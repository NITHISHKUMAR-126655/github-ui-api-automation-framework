import { expect, uiTest as test } from '../../src/fixtures';
import uiData from '../../testdata/uiData.json';

const user = uiData.publicUser;

test.describe('UI | Public user profile', () => {
  test('UI-02 validate a known public user profile', { tag: ['@smoke', '@ui'] }, async ({ page, profilePage }) => {
    await profilePage.open(user.username);

    await expect(page).toHaveURL(user.profileUrl);
    expect(await profilePage.getPageTitle()).toContain(user.username);
    await expect(profilePage.getUsername(user.username)).toBeVisible();
    await expect(profilePage.getFollowersLink()).toBeVisible();
    await expect(profilePage.getRepositoriesTab()).toBeVisible();

    await profilePage.openRepositoriesTab();
    await expect(page).toHaveURL(/tab=repositories/);
    await expect(profilePage.getRepositoryLink(user.expectedRepository)).toBeVisible();
  });
});
