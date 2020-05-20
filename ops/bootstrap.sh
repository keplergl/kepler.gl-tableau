#!/bin/bash

APP_NAME=distro
TEMP_DIR="/opt/7park/temp_attachments/"

wait_tcp_port() {
  local host="$1" port="$2"

  # see http://tldp.org/LDP/abs/html/devref1.html for description of this syntax.
  NEXT_WAIT_TIME=0
  while ! exec 6<>/dev/tcp/$host/$port || [ $NEXT_WAIT_TIME -eq 20 ]; do
    echo "$(date) - still trying to connect to $host:$port"
    sleep $((NEXT_WAIT_TIME++))
  done
  exec 6>&-
}

echo "Current env=${ENV}"

if [ -z "${ENV}" ]; then
  source branch_to_env.sh
fi

mkdir "${TEMP_DIR}"
export TEMP_FILE_DIR="${TEMP_DIR}"
export ENVIRONMENT="${ENV}"

echo "Debug variables, ENV=${ENV} APP_NAME=${APP_NAME}"
python print_parameters.py --env="${ENV}" --app="${APP_NAME}" -d

# Load variable:qs to environment
# shellcheck disable=SC2046
eval $(python print_parameters.py --env="${ENV}" --app="${APP_NAME}")

case "$1" in
api)
  gunicorn --chdir distrib -b 0.0.0.0:8080 wsgi:app -t 1200
  exit
  ;;
celery_beat)
  celery -A distrib.celery_config.celery beat --loglevel info
  exit
  ;;
celery_worker)
  if [ "${ENV}" = 'dev' ]; then
    celery -A distrib.celery_config.celery worker -B --loglevel info -Q dev_distro-workitems
  else
    celery -A distrib.celery_config.celery worker -B --loglevel info -Q distro-workitems
  fi
  exit
  ;;
*)
  # The command is something like bash. Just run it in the right environment.
  exec "$@"
  ;;
esac
