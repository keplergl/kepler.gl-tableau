#!/bin/bash

APP_NAME=kepler

echo "Current env=${ENV}"

if [ -z "${ENV}" ]; then
  source branch_to_env.sh
fi

export ENVIRONMENT="${ENV}"

echo "Debug variables, ENV=${ENV} APP_NAME=${APP_NAME}"
python3 print_parameters.py --env="${ENV}" --app="${APP_NAME}" -d

# Load variable:qs to environment
# shellcheck disable=SC2046
eval $(python3 print_parameters.py --env="${ENV}" --app="${APP_NAME}")

case "$1" in
webserver)
  yarn start
  exit
  ;;
*)
  # The command is something like bash. Just run it in the right environment.
  exec "$@"
  ;;
esac