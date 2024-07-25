/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
export default (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue! Our humans will look into this.",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  app.on("pull_request.opened", async(context) => {
    let {reviewers} = await context.config("auto_assign.yml");
    reviewers = reviewers.filter(reviewer => reviewer !== context.payload.sender.login);
    const params = context.pullRequest({reviewers});
    return context.octokit.pulls.requestReviewers(params);
  });
};
