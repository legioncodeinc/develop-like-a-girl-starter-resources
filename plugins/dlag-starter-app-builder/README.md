# Starter App Builder

Install dlag-starter-core from the same marketplace first, then this plugin. Six Playbooks and Specialists provide application building, data UI, onboarding, search, integrations and optional Stripe hosted checkout. Commands: `/dlag-starter-app-builder:build-app`, `/dlag-starter-app-builder:build-app-search`, `/dlag-starter-app-builder:build-integration`.

Core prerequisites are invoked with namespaced Skill calls. If a required Core Playbook is unavailable, stop that dependent work and report the prerequisite. No sibling cache paths or automatic dependency resolution are assumed.

Specialists may edit authorized local source and project documents. Shell execution, dependency installation, browser tests, provider operations, credentials and publishing require a suitable caller and existing owner authorization. Package discovery is not application or live provider proof.
