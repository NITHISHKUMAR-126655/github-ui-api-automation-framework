import { expect, uiTest as test } from '../../src/fixtures';
import uiData from '../../testdata/uiData.json';

const repo = uiData.publicRepository;

test.describe('UI | Public repository search', () => {
  test('UI-01 search a known public repository and validate its details', { tag: ['@smoke', '@ui'] }, async ({
    page,
    homePage,
    searchResultsPage,
    repositoryPage,
  }) => {
    await homePage.open();
    await homePage.searchRepository(repo.searchKeyword);

    await expect(searchResultsPage.getRepositoryLink(repo.fullName)).toBeVisible();
    await searchResultsPage.openRepository(repo.fullName);

    await expect(page).toHaveURL(repo.url);
    await expect(repositoryPage.getRepositoryName(repo.name)).toBeVisible();
    await expect(repositoryPage.getOwner(repo.owner)).toBeVisible();
    await expect(repositoryPage.getTab('Code')).toBeVisible();
    await expect(repositoryPage.getTab('Issues')).toBeVisible();
    await expect(repositoryPage.getTab('Pull requests')).toBeVisible();
    await expect(repositoryPage.getFileListing()).toBeVisible();
    expect(await repositoryPage.getPageTitle()).toContain(repo.fullName);
  });
});
