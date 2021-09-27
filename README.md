# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Amplify CLI Commands

When running this application it may be necessary to make changes or get changes to amplify dependecies and services. Here are a couple of commands that can help accomplish this.

### `amplify pull --appId <ID> --envName <BackendEnv>`

The amplify pull command operates similar to a git pull, fetching upstream backend environment definition changes from the cloud and updating the local environment to match that definition. The command is particularly helpful in team scenarios when multiple team members are editing the same backend, pulling a backend into a new project, or when connecting to multiple frontend projects that share the same Amplify backend environment.

In other words this command will pull and update any amplify resources that have been changed when ran with the Amplify CLI. Where the ID is the ID associated with the application and the BackendEnv is the name of the backend you are currently using. This can be found in the Admin UI at the top right in the popup opened when clicking *Local setup Instructions* Here is a link to the admin page https://us-east-1.admin.amplifyapp.com/admin/dvho1kvvcvpi/staging/home

### `amplify <category> add`

Once init is complete, run the command `amplify <category> add` to add resources of a category to the cloud. This will place a CloudFormation template for the resources of this category in the category's subdirectory amplify/backend/<category> and insert its reference into the above-mentioned root stack as the nested child stack. **Note: When working in teams, it is good practice to run an amplify pull before modifying the backend categories.**

### `amplify console`

The amplify console command launches the browser directing you to your cloud project in the AWS Amplify Console. The Amplify Console provides a central location for development teams to view and manage their backend environments, status of the backend deployment, deep-links to the backend resources by Amplify category, and instructions on how to pull, clone update, or delete environments.

### `amplify logout --appId \<Amplify App Id>`

When Amplify CLI is authenticated with the Amplify Admin UI, JSON Web Tokens (JWTs) are stored on the developer's machine. This command will remove the JWTs associated with a particular Amplify app. The CLI will also prompt if you want to logout from all sessions. 'Yes' will remove the JWTs and ensure they are invalidated globally. 'No' will still remove the locally-stored JWTs but the tokens will remain valid until they expire.

### More Commands

Here is a link to the above commands, most of the information above was taken from here as well https://docs.amplify.aws/cli/start/workflows/

## GitHub 

When adding code changes to the github repository a few things may end up being helpful in making sure things are kept up and running here are just a few best practices I have found that help manage multiple people working on the same project. I assume most people are familar with github, but if not its no problem, just try and follow this and ask questions if you are still lost.

### Good GitHub Practices

These are just some guidelines on the git workflow that make sure everyones code plays along nicely and fair.

1. Always make a new branch when making changes. That way we can just merge the new branch into our master and then rollback that merge if things break. **Note: Pushing changes directly to master is a big power play and even if it doesn't break anything everyone will be intimidated and fear you, which may cause some internal power struggles.**

2. Before creating a new branch or pushing a branch to merge it, make sure you get any changes to the repo with `git fetch <remote-branch>`. This just helps with keeping merge conflicts out. See https://www.atlassian.com/git/tutorials/syncing/git-fetch for more details.

3. When committing your changes don't squash them unless you are sure you want to. Commits are like checkpoints so its okay to have a bunch of them.

4. If you follow these guidelines and something does happen to break, don't sweat it! It is seriously easy to rollback a merge, and even if you missed a step, most of the time there are other methods to go back to a working build and fix things up, but try to follow these few guidelines as it will make it less work to fix these things, and bring less shame when things do break. But everyone breaks the build from time to time, it's kinda fun.

### Example Git Workflow
Not every workflow has to be the same but this is just works for me.

1. Clone remote repo

2. Checkout a local branch based of the branch I want to change.

3. Make changes in my IDE.

4. Stage/Add changes for commit.

5. Commit changes.

6. Push local branch up to the remote repo

7. Once I am sure my changes are ready, I merge the newly pushed remote branch into the branch I based it off of, which is typically the master branch.

This is probably not a perfect process but it keeps my changes seperate from the remote branch until I am sure I can merge them. I use git bash because it's what I am used to but the GUI should also follow some kind of protocol to avoid issues working together. Here is a guide for the GUI https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/overview/getting-started-with-github-desktop

## Information on Using GitBash

This section is only really for people that use gitbash or something similar to make code changes. Gitbash is not required but if you like having everything being done from the command line its a nice tool.

### Cloning the Repo Into Your Local Enviorment with `git clone <httpcode>`

When you are first getting started the easiest part is cloning the existing repository. You could just download the zip and then link it to git later but it is much easier to clone 
the repo so you can skip linking the local repo to the upstream. If you are using GitBash then all you have to do is run `git clone <httpcode>` and that's it! The <httpcode> is located on the repository under the 'code' dropdown menu.

### Checking Out a New Branch: `git checkout -b <local-branch-name-you-choose> <remote-branch-you-are-updating>`

This command creates a new branch locally, with the first argument being the name you want it to be called and the second argument being the branch you are updating or basing it off of, usually the remote branch is `origin/master` but you can base it off other branches.
 
### Adding Changes to Your Next Commit `git add <filename-changed>`

Before committing changes you will have to add them. Running `git status` will show you a list of changes, some files you might not want to be added to the commit so you add those files to the `gitignore` file if you want to keep them locally and just remove them by running `git checkout -- <filename>` if you want to remove those changes completely. Be careful not to delete the work you already did. Once you are happy with the changes you can then add them to be staged for the next commit. This is done by running `git add <filename-changed>` which will add the changed file to be committed.

### Committing Changes `git commit -m "commit message/description here"`

When you are done making the changes in your editor of choice and have staged them to be committed, you commit them with this command above. This saves your progress on to your remote branch that you made earlier  

### Pushing Changes to the Remote Repo `git push origin HEAD`

Once you have committed all your local changes and are ready to put it up to be reviewed or merge it into another, you will have to push your local branch to the remote repo to create that branch on the remote repo. You can usually just run the command above, `HEAD` is just the top of the current branch which means if your local branch is already on the remote repo then it will update the branch you created. More info here: https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository

### Merging

This section is applicable to both bash and GUI users but you will create a pull request on the github page and then select your created branch and the branch you would like to merge it into and once you are sure you just click 'merge'. If you have merge conflicts you will have to fix those but it usually is not that hard. 

### Merge Conflicts

This can sometimes be tricky to fix but it is simply when two people make changes to the same files and git doesn't know which changes to keep and which to toss. You will have to resolve these if you get a message saying **MERGE CONFLICTS** when you try and update your branch with new changes from the remote upstream, or when you are about to merge two branches. Here is a guide with more info on merge conflicts: https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
