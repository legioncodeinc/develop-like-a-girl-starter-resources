<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/brand/dlag-signature-on-dark-1200.png">
  <img src="../assets/brand/dlag-signature-on-light-1200.png" alt="Develop Like a Girl" width="210">
</picture>

**THE BUILD STUDIO · STARTER KIT**

# Your first session

By the end of this walkthrough, you will have a small project brief and a first task you can approve. Use the example as practice, then replace it with your own idea.

**Before you start:** [Install Core](install-and-verify.md). On desktop, open **Code**, choose **Local**, and select your project folder. In the terminal, open that folder and run `claude`. This exercise can start in an empty folder and does not need a provider account.

## 1. Describe one person and one job

Send:

```text
/dlag-starter-core:get-started I want a website for a neighborhood pottery class. A
visitor should understand the class and request a place. Inspect this folder, preserve
existing work, and recommend one first task. Keep the proposal in chat.
```

Look for a short account of the folder, any missing information, and a recommendation. It is reasonable for the studio to ask about the class details, audience, or visual direction. Answer the questions that change the first task.

## 2. Turn the idea into a first version

Send:

```text
/dlag-starter-core:plan-project Plan the first version of the pottery-class website.
Start with one public page showing the class, date, price, and contact details. Use
clearly marked draft copy for missing facts. Save the draft to docs/first-version.md in
this project. If that file already exists, show me how you would update it first. Defer
booking, payment, and email automation.
```

The requested Markdown file should capture the outcome, essential content, deferred ideas, and checks. If the session cannot write files, it should provide the complete draft and say it is unsaved. Confirm the actual saved path before moving on.

## 3. Make the task testable

Ask:

```text
Refine the first task so I can tell when it is finished. Include the mobile layout,
keyboard navigation, clear contact action, and what should happen when content is
missing. Keep the first task limited to the public page.
```

“Build the site” is too broad to review. “A visitor can read the class information on a phone and find the contact action” is something you can check. A plan is still a draft until you accept it.

## 4. Choose the implementation step

Read the draft, correct the facts, and accept the first task when it matches your intent. Then follow [Build a website](build-a-website.md). That guide uses the Website Builder to author a local slice. Project setup and planning do not scaffold or deploy the application for you.

## Before you leave the session

Ask for the saved paths, accepted decisions, open questions, and one next task. Keep this short enough that you can use it to restart tomorrow. If the discussion grows into accounts, checkout, and automation, move those ideas to the deferred list and finish the public page first.

**Next:** [Build a website](build-a-website.md), or [Build an app](build-an-app.md) for a signed-in product.

---

[Learning hub](README.md) · [Kit overview](../README.md)
