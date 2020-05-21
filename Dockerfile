FROM node:13.8.0
MAINTAINER mpost@7parkdata.com

WORKDIR /opt/7park
COPY . /opt/7park/
COPY ops/bootstrap.sh /opt/7park/bootstrap.sh
COPY ops/branch_to_env.sh /opt/7park/branch_to_env.sh
COPY ops/print_parameters.py /opt/7park/print_parameters.py

RUN apt update && apt install python3-pip -y && \
    pip3 install boto3

RUN yarn --ignore-engines

ENTRYPOINT ["/bin/bash", "bootstrap.sh"]
CMD ["webserver"]