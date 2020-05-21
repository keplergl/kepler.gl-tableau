#!/bin/bash

echo "Running deployment for branch $CI_BRANCH"
source /deploy/ops/branch_to_env.sh

aws --version
pip install awscli==1.18.63
pip install jinja2-cli==0.6.0
aws --version

#for COMMAND in "api" "rq" "unicorn"

jinja2 /deploy/ops/tasks/${ENV}/task_def.json.j2 -D branch=${CI_BRANCH} -D env=${ENV} >/task_def_kepler.json

cat task_def_kepler.json

# Register a new version of the task defined in json and update
# the currently running instances
aws ecs register-task-definition --cli-input-json file:///task_def_kepler.json

aws ecs update-service --cluster seven-park-${ENV} --service kepler-${ENV}-service --task-definition kepler-${ENV}-td
