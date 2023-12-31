// import { Inngest } from "inngest";
// // See the "inngest/next" adapter imported here:
// import { serve } from "inngest/next"; // see above function

// const inngest = new Inngest({ name: "Payment Status" });

// // Securely serve your Inngest functions for remote invocation:
// // This function will be invoked by Inngest via HTTP any time
// // the "app/user.signup" event is sent to to Inngest
// export default inngest.createFunction(
//   { name: "User onboarding communication" },
//   { event: "app/user.signup" },
//   async ({ event, step }) => {
//     await step.run("Send welcome email", async () => {
//       await sendEmail({
//         email: event.data.email,
//         template: "welcome",
//       });
//     });
//   }
// );

// const paymentCheck = inngest.createFunction(
//   { name: "batchEvents" },
//   { cron: "* * * * *" }, // Every minute
//   async () => {
//     const results = await checkPaymentStatusAndResellProxy();
//   }
// );
