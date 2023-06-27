# Contributing

We'd love for you to contribute to our source code and to help make Typeform products even better than they are today! Here are the guidelines we'd like you to follow:

* [Code of Conduct](#code-of-conduct)
* [Issues and Bugs](#issues-and-bugs)
* [Submission Guidelines](#submission-guidelines)
* [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

As contributors and maintainers of this project, we pledge to respect everyone who contributes by posting issues, updating documentation, submitting pull requests, providing feedback in comments, and any other activities.

Communication through any of Typeform's channels (GitHub, StackOverflow, Twitter, etc.) must be constructive and never resort to personal attacks, trolling, public or private harassment, insults, or other unprofessional conduct.

We promise to extend courtesy and respect to everyone involved in this project regardless of gender, gender identity, sexual orientation, disability, age, race, ethnicity, religion, or level of experience. We expect anyone contributing to the project to do the same.

If any member of the community violates this code of conduct, the maintainers of this Project project may take action, removing issues, comments, and PRs or blocking accounts as deemed appropriate.

If you are subject to or witness unacceptable behavior, or have any other concerns, please drop us a line at devplatform@typeform.com

## Issues and Bugs

If you find a bug in the source code, a mistake in the documentation, or some other issue, you can help us by submitting an issue to our [GitHub Repository][github]. Even better you can submit a Pull Request with a test demonstrating the bug and a fix!

See [below](#submission-guidelines) for some guidelines.

## Submission Guidelines

### Submitting an Issue

Before you submit your issue, try searching [past issues][archive] or [StackOverflow][stackoverflow] for issues similar to your own. You can help us to maximize the effort we spend fixing issues, and adding new features, by not reporting duplicate issues.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Providing the following information will increase the chances of your issue being dealt with quickly:

* **Description of the Issue** - if an error is being thrown a non-minified stack trace helps
* **Motivation for or Use Case** - explain why this is a bug for you
* **Related Issues** - has a similar issue been reported before?
* **Environment Configuration** - is this a problem with Node.js, or only a specific browser? Is this only in a specific version of the library?
* **Reproduce the Error** - provide a live example (like on [StackBlitz](https://stackblitz.com/)), a Github repo, or an unambiguous set of steps
* **Suggest a Fix** - if you can't fix the bug yourself, perhaps you can point to what might be causing the problem (line of code or commit)

### Submitting a Pull Request

#### Pull Request Guidelines

* Search [GitHub][pulls] for an open or closed Pull Request that relates to your submission. You don't want to duplicate effort.
* Create an issue to discuss a change before submitting a PR. We'd hate to have to turn down your contributions because of something that could have been communicated early on.
* [Create a fork of the GitHub repo][fork-repo] to ensure that you can push your changes for us to review.
* Make your changes in a new git branch:

  ```shell
  git checkout -b my-fix-branch dev
  ```

* Create your patch, **including appropriate test cases**. Patches with tests are more likely to be merged.
* Avoid checking in files that shouldn't be tracked (e.g `node_modules`, `gulp-cache`, `.tmp`, `.idea`). If your development setup automatically creates some of these files, please add them to the `.gitignore` at the root of the package (click [here][gitignore] to read more on how to add entries to the `.gitignore`).
* Commit your changes using a commit message that follows our [commit message guidelines](#commit-message-guidelines).

  ```shell
  git commit -a
  ```

  _Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files._

* Test your changes locally to ensure everything is in good working order:

  ```shell
  # Run the server in one terminal window
  yarn server
  ```

  ```shell
  # Run the tests in another terminal window
  yarn test:unit
  yarn test:integration
  ```

* Push your branch to your fork on GitHub:

  ```shell
  git push origin my-fix-branch
  ```

* In GitHub, send a pull request to `js-api-client:main`.
* All pull requests must be reviewed by a member of the Typeform team, who will merge it when/if they feel it is good to go.

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more readable messages** that are easy to follow when looking through the **project history**.  But also, we use the git commit messages to **generate the project change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special format that includes a **type**, a **scope** and a **subject**:

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system, CI configuration or external dependencies (example scopes: gulp, broccoli, npm)
* **chore**: Other changes that don't modify `src` or `test` files

That's it! Thank you for your contribution!

[archive]: https://github.com/Typeform/js-api-client/issues?utf8=%E2%9C%93&q=is:issue
[fork-repo]: https://github.com/Typeform/js-api-client/fork
[github]: https://github.com/Typeform/js-api-client
[gitignore]: https://git-scm.com/docs/gitignore
[pulls]: https://github.com/Typeform/js-api-client/pulls
[stackoverflow]: https://stackoverflow.com/questions/tagged/typeform
