=====
Epics
=====

This allows list, retrieve, create, update, and delete of Epics.

Retrieve
--------

.. sourcecode:: http

   GET /api/epics/ HTTP/1.1

.. sourcecode:: http

   HTTP/1.1 200 OK

    {
      "count": 150,
      "next": "https://.../api/epics/?page=2",
      "previous": null,
      "results": [
        {
          "id": "3Lw7OwK",
          "name": "Test Epic",
          "description": "This is *safely* rendered Markdown.",
          "description_rendered": "<p>This is <em>safely</em> rendered Markdown.</p>",
          "slug": "test-epic",
          "old_slugs": [],
          "project": "zVQYrye",
          "branch_name": "feature/test-epic",
          "branch_url": "https://github.com/SFDO-Tooling/test-project/tree/feature/test-epic",
          "branch_diff_url": "https://github.com/SFDO-Tooling/test-project/compare/main...feature/test-epic",
          "has_unmerged_commits": true,
          "currently_creating_pr": false,
          "currently_fetching_org_config_names": false,
          "pr_url": "https://github.com/SFDO-Tooling/test-project/pull/1357",
          "pr_is_open": true,
          "pr_is_merged": false,
          "github_users": [
            {
              "id": "12345",
              "login": "username",
              "avatar_url": "https://avatars0.githubusercontent.com/u/someId?v=4"
            }
          ],
          "status": "In progress",
          "available_task_org_config_names": [
            {
              "key": "dev",
              "label": "Dev Org",
              "description": "Org set up for package development"
            },
            {
              "key": "qa"
            }
          ]
        }
        ...
      ]
    }
