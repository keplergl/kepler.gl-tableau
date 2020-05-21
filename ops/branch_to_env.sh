#!/bin/bash

echo Current branch ${CI_BRANCH}

case "${CI_BRANCH}" in
   dev)
        ENV="dev"
        ;;
   master)
        ENV="prod"
        ;;
    *)
        ENV="dev"
        ;;
esac

echo Running for env=${ENV}
