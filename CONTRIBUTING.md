# Contributing

## General Workflow

1. Fork the repo
1. Implement fixes and/or features.  Commit with specific details on what has changed.
1. When you've finished with your fix or feature, rebase upstream changes into your branch. Submit a pull request.
   directly to master. Include a description of your changes.
1. Your pull request will be reviewed by the scrum master.
1. Fix any issues raised by your code reviewer, and push your fixes as a single
   new commit.
1. Once the pull request has been reviewed, it will be merged by the scrum master. Do not merge your own commits.


### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code DRY.
    - Follow the style guide.
    - Include thorough comments.