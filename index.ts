import * as LaunchDarkly from "launchdarkly-node-server-sdk";

// TODO : Enter your LaunchDarkly SDK key here
const client = LaunchDarkly.init(process.env.LD_API_KEY || "");

const user = {
  firstName: "Bob",
  lastName: "Loblaw",
  email: "louise@example.com",
  key: process.env.KEY || "default",
  custom: {
    groups: "beta_testers",
  },
};

client.once("ready", function () {
  // TODO : Enter the key for your feature flag here
  client.variation("enable-pinning", user, false, function (err, showFeature) {
    client.track("event-called", user);
    if (showFeature) {
      // application code to show the feature
      console.log("Showing your feature to " + user.email);
    } else {
      // the code to run if the feature is off
      console.log("Not showing your feature to " + user.email);
    }
    client.flush(function () {
      client.close();
    });
  });
});
