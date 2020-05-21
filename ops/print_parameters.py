import argparse

import boto3


def _get_params(client, path, next_token, debug):
    params = []
    p = dict(
        Path=path,
        Recursive=True,
        ParameterFilters=[],
        WithDecryption=not debug
    )
    if next_token:
        p['NextToken'] = next_token
    response = client.get_parameters_by_path(**p)
    next_token = response.get('NextToken')
    params.extend(response['Parameters'])
    if next_token:
        params.extend(_get_params(client, path, next_token, debug))
    return params


def run(env, app_name, debug=False):
    all_path = [
        '/common/',
        '/{env}/common/'.format(env=env),
        '/{env}/{app_name}/'.format(env=env, app_name=app_name)]

    # client = boto3.client('ssm')
    client = boto3.client('ssm', region_name='us-east-1')

    for path in all_path:
        params = _get_params(client, path, None, debug)

        for param in params:
            env_var = param['Name'].split(path)[1]
            if debug:
                if param['Type'] == 'SecureString':
                    param['Value'] = '****'
                print(param)
            else:
                print("export {}='{}'".format(env_var, param['Value']))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Print varialbes from EC2 Parameter Store')
    parser.add_argument('-d', '--debug', required=False, action='store_true',
                        help='Debug variables if True or print export commands otherwise')
    parser.add_argument('-e', '--env', required=True,
                        help='Environment')
    parser.add_argument('-a', '--app', required=True,
                        help='Application name')

    args = parser.parse_args()
    run(args.env, args.app, args.debug)
