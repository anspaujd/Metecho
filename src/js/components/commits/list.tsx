import Avatar from '@salesforce/design-system-react/components/avatar';
import DataTable from '@salesforce/design-system-react/components/data-table';
import DataTableCell from '@salesforce/design-system-react/components/data-table/cell';
import DataTableColumn from '@salesforce/design-system-react/components/data-table/column';
import classNames from 'classnames';
import { format, formatDistanceToNow } from 'date-fns';
import i18n from 'i18next';
import React, { ReactNode } from 'react';

import { ExternalLink } from '~js/components/utils';
import { Commit } from '~js/store/tasks/reducer';

interface TableCellProps {
  [key: string]: any;
  className?: string;
  children?: ReactNode;
  item?: Commit;
}

const CommitTableCell = ({ item, className, ...props }: TableCellProps) => {
  /* istanbul ignore if */
  if (!item) {
    return null;
  }
  const shortSha = item.id.substring(0, 7);
  return (
    <DataTableCell
      {...props}
      title={item.id}
      className={classNames(className, 'commits-sha')}
    >
      <ExternalLink url={item.url}>{shortSha}</ExternalLink>
    </DataTableCell>
  );
};
CommitTableCell.displayName = DataTableCell.displayName;

const AuthorTableCell = ({ item, className, ...props }: TableCellProps) => {
  /* istanbul ignore if */
  if (!item) {
    return null;
  }
  let author = item.author.username;
  const name = item.author.name;
  if (name && name !== author) {
    author = `${author} (${name})`;
  }
  return (
    <DataTableCell
      {...props}
      title={author}
      className={classNames(className, 'commits-author')}
    >
      <Avatar
        imgAlt={`${i18n.t('avatar for user')} ${author}`}
        imgSrc={item.author.avatar_url}
        title={author}
        size="small"
      />
    </DataTableCell>
  );
};
AuthorTableCell.displayName = DataTableCell.displayName;

const MessageTableCell = ({
  children,
  className,
  ...props
}: TableCellProps) => (
  <DataTableCell
    {...props}
    className={classNames(className, 'commits-message', 'truncated-cell')}
  >
    {children}
  </DataTableCell>
);
MessageTableCell.displayName = DataTableCell.displayName;

const TimestampTableCell = ({ item, className, ...props }: TableCellProps) => {
  /* istanbul ignore if */
  if (!item) {
    return null;
  }
  const timestamp = new Date(item.timestamp);
  return (
    <DataTableCell
      {...props}
      title={format(timestamp, 'PPpp')}
      className={classNames(className, 'commits-timestamp')}
    >
      {formatDistanceToNow(timestamp, { addSuffix: true })}
    </DataTableCell>
  );
};
TimestampTableCell.displayName = DataTableCell.displayName;

const CommitList = ({ commits }: { commits: Commit[] }) =>
  commits.length ? (
    <>
      <h2
        className="slds-text-heading_medium
          slds-m-top_large
          slds-m-bottom_x-small"
      >
        Commit History
      </h2>
      <DataTable
        items={commits}
        id="task-commits-table"
        className="slds-table_header-hidden"
        noRowHover
      >
        <DataTableColumn
          key="sha"
          label={i18n.t('Commit')}
          property="id"
          primaryColumn
          width="0"
        >
          <CommitTableCell />
        </DataTableColumn>
        <DataTableColumn
          key="author"
          label={i18n.t('Author')}
          property="author"
          width="2.5rem"
        >
          <AuthorTableCell />
        </DataTableColumn>
        <DataTableColumn
          key="message"
          label={i18n.t('Message')}
          property="message"
          width="100%"
        >
          <MessageTableCell />
        </DataTableColumn>
        <DataTableColumn
          key="timestamp"
          label={i18n.t('Timestamp')}
          property="timestamp"
          width="0"
        >
          <TimestampTableCell />
        </DataTableColumn>
      </DataTable>
    </>
  ) : null;

export default CommitList;
