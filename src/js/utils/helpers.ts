import i18n from 'i18next';

import { Changeset, Org } from '@/store/orgs/reducer';
import { Project } from '@/store/projects/reducer';
import { Task } from '@/store/tasks/reducer';

export const pluralize = (count: number, str: string) =>
  count === 1 ? str : `${str}s`;

export const getOrgStatusMsg = (org: Org) => {
  if (org.has_unsaved_changes) {
    const totalChanges = Object.values(org.unsaved_changes).flat().length;
    /* istanbul ignore else */
    if (totalChanges) {
      const statusMsgDefault = `has ${totalChanges} uncaptured ${pluralize(
        totalChanges,
        'change',
      )}`;
      return i18n.t('orgStatusMsg', statusMsgDefault, {
        count: totalChanges,
      });
    }
  }
  return i18n.t('up to date');
};

export const getOrgBehindLatestMsg = (
  missingCommits: number,
  titleCase?: boolean,
) => {
  /* istanbul ignore else */
  if (missingCommits > 0) {
    const msgDefault = titleCase
      ? `${missingCommits} ${pluralize(missingCommits, 'Commit')}`
      : `${missingCommits} ${pluralize(missingCommits, 'commit')}`;
    const name = titleCase ? 'orgBehindTitle' : 'orgBehindMsg';
    return i18n.t(name, msgDefault, {
      count: missingCommits,
    });
  }
  return '';
};

export const getOrgTotalChanges = (changes: Changeset) => {
  const totalChanges = Object.values(changes).flat().length;
  const changesMsgDefault = `${totalChanges} total ${pluralize(
    totalChanges,
    'change',
  )}`;
  return i18n.t('orgTotalChangesMsg', changesMsgDefault, {
    count: totalChanges,
  });
};

export const getOrgChildChanges = (count: number) => {
  const msgDefault = `${count} ${pluralize(count, 'change')}`;
  return i18n.t('orgChildChangesMsg', msgDefault, {
    count,
  });
};

export const getBranchLink = (object: Task | Project) => {
  let branchLink, branchLinkText;
  if (object.pr_url) {
    branchLink = object.pr_url;
    branchLinkText = i18n.t('View Pull Request');
  } else if (object.has_unmerged_commits && object.branch_diff_url) {
    branchLink = object.branch_diff_url;
    branchLinkText = i18n.t('View Changes');
  } else if (object.branch_url) {
    branchLink = object.branch_url;
    branchLinkText = i18n.t('View Branch');
  }
  return { branchLink, branchLinkText };
};