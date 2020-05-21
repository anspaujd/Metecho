/* eslint-disable @typescript-eslint/camelcase */
import Icon from '@salesforce/design-system-react/components/icon';
import i18n from 'i18next';
import React from 'react';
import { Link } from 'react-router-dom';

import { ExternalLink } from '@/components/utils/';
import { Project } from '@/store/projects/reducer';
import { Repository } from '@/store/repositories/reducer';
import routes from '@/utils/routes';

interface Props {
  repository: Repository;
  project: Project;
}

const ProjectListItem = ({ repository, project }: Props) => {
  const { name, description_rendered, slug, branch_url, branch_name } = project;

  return (
    <>
      <li className="slds-item slds-p-horizontal_none slds-p-vertical_medium">
        <h3 className="slds-text-heading_small">
          <Link to={routes.project_detail(repository.slug, slug)}>{name}</Link>
        </h3>
        {description_rendered && (
          <p
            className="markdown"
            dangerouslySetInnerHTML={{ __html: description_rendered }}
          />
        )}
        {branch_url && (
          <p
            className="slds-text-body_small
              slds-p-top_x-small
              slds-text-color_weak"
          >
            {i18n.t('Branch:')}{' '}
            <ExternalLink url={branch_url}>
              {branch_name}
              <Icon
                category="utility"
                name="new_window"
                size="xx-small"
                className="slds-m-bottom_xx-small"
                containerClassName="slds-m-left_xx-small"
              />
            </ExternalLink>
          </p>
        )}
      </li>
    </>
  );
};

export default ProjectListItem;
