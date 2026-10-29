import { expect, uiTest as test } from '../../src/fixtures';
import uiData from '../../testdata/uiData.json';
import { DataUtil } from '../../src/utils/DataUtil';

test.describe('UI | Negative repository scenarios', () => {
  test('UI-05a searching for a non-existing repository shows an empty state', { tag: ['@negative', '@ui'] }, async ({
    homePage,
    searchResultsPage,
  }) => {
    const keyword = DataUtil.uniqueName(uiData.negative.randomSearchPrefix);

    await homePage.open();
    await homePage.searchRepository(keyword);

    await expect(searchResultsPage.getNoResultsMessage()).toBeVisible();
    await expect(searchResultsPage.getRepositoryLink(uiData.publicRepository.fullName)).toHaveCount(0);
  });

  test('UI-05b opening an invalid repository URL returns a 404 page', { tag: ['@negative', '@ui'] }, async ({
    repositoryPage,
  }) => {
    const { invalidOwner, invalidRepository, notFoundTitle } = uiData.negative;

    const response = await repositoryPage.open(invalidOwner, invalidRepository);

    expect(response?.status()).toBe(404);
    expect(await repositoryPage.getPageTitle()).toContain(notFoundTitle);
    await expect(repositoryPage.getTab('Code')).toHaveCount(0); // no repository UI is rendered
  });
});
