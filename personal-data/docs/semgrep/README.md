# Setting Up Semgrep Token in GitLab CI/CD

This guide explains how to obtain the **SEMGREP_APP_TOKEN** from [semgrep.dev](https://semgrep.dev/) and configure it in GitLab.
![Semgrep Pipeline](./images/semgrep.png)

## 1. Get the Semgrep Token  
To integrate Semgrep with GitLab, you need to generate an API token:

1. Go to [Semgrep Dashboard](https://semgrep.dev/)
2. Sign in or create an account.
3. Click on **Settings** (⚙️) > **Tokens**.
4. Click **Generate new token**.
5. Copy the generated token.



## 2. Add the Token to GitLab  
Once you have the **SEMGREP_APP_TOKEN**, follow these steps to add it to GitLab:

1. Navigate to your GitLab project.
2. Go to **Settings** > **CI/CD**.
3. Expand the **Variables** section.
4. Click **Add Variable** and enter:
   - **Key:** `SEMGREP_APP_TOKEN`
   - **Value:** (Paste your token)
   - **Type:** **Masked & Protected** (recommended)
5. Click **Save Variable**.



## 3. Update GitLab CI/CD Pipeline  
Ensure your `.gitlab-ci.yml` includes the Semgrep job with the token:

```yaml
semgrep-scan:
  stage: test
  script:
    - semgrep logout || true
    - export SEMGREP_APP_TOKEN="$SEMGREP_APP_TOKEN"
    - semgrep login
    - semgrep ci --no-suppress-errors
    - semgrep --config=.semgrep/ --error --json --output semgrep-results.json
  artifacts:
    paths:
      - semgrep-results.json
    expire_in: 1 week
  only:
    refs:
      - merge_requests
      - main
      - develop
```

## 4. Run the Pipeline  
Once everything is set up,trigger the pipeline. You can check the Semgrep scan results under **Build  > Pipelines**.


---
This guide ensures your GitLab project is secured with Semgrep static analysis. 🚀
